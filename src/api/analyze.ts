import { lookupTickerMetadata } from "@/data/tickerMetadata";

// ✅ Calls your deployed AWS Lambda (Bedrock + Finance integration)
// ✅ Normalizes the response shape for the frontend components

function clampRisk(value: number) {
  if (Number.isNaN(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return Number(value.toFixed(2));
}

function fallbackRiskFromLabel(label: string) {
  const normalized = (label || "").toLowerCase();
  if (normalized === "high") return 0.85;
  if (normalized === "medium") return 0.55;
  return 0.25;
}

const TRANSLATION_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /Risque faible sur/gi, replacement: "Low risk for" },
  { pattern: /Risque élevé sur/gi, replacement: "High risk for" },
  {
    pattern: /pas d['’]ajustement immédiat/gi,
    replacement: "no immediate portfolio changes required",
  },
  {
    pattern: /Réduire l’exposition aux secteurs sensibles/gi,
    replacement: "Reduce exposure to sensitive sectors",
  },
  {
    pattern: /Portefeuille globalement stable face à cette régulation/gi,
    replacement: "Portfolio remains stable under this regulation",
  },
  {
    pattern: /Recommandation principale\s*:/gi,
    replacement: "Primary recommendation:",
  },
  {
    pattern: /Exposition sectorielle générale à la mesure réglementaire/gi,
    replacement: "General sector exposure to this regulation",
  },
];

function translateToEnglish(text: string) {
  let output = text;
  for (const { pattern, replacement } of TRANSLATION_RULES) {
    output = output.replace(pattern, replacement);
  }
  return output;
}

const RISK_TEXT_RULES: Array<{ pattern: RegExp; score: number }> = [
  {
    pattern: /\b(ban|prohibit|prohibition|suspend|suspension|revok|terminate|shutdown|seizure|penalt|fine|forfeit|tax|tariff)\b/i,
    score: 0.85,
  },
  {
    pattern: /\b(tighten|restrict|limit|licen[sc]e requirement|mandatory|compliance|enforcement|audit|inspection|threshold|increase|cap)\b/i,
    score: 0.65,
  },
  {
    pattern: /\b(report|disclose|monitor|assessment|review|documentation|filing|registration)\b/i,
    score: 0.45,
  },
  {
    pattern: /\b(incentive|support|credit|grant|subsidy|remain stable|no immediate impact)\b/i,
    score: 0.25,
  },
];

function inferRiskScore({
  base,
  fallback,
  text,
}: {
  base?: number;
  fallback: number;
  text: string[];
}) {
  const baseScore =
    typeof base === "number" && !Number.isNaN(base) ? clampRisk(base) : null;

  const combined = text
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let textScore: number | null = null;

  if (combined.length > 0) {
    for (const { pattern, score } of RISK_TEXT_RULES) {
      if (pattern.test(combined)) {
        textScore = score;
        break;
      }
    }
  }

  const fallbackScore = clampRisk(fallback);

  return clampRisk(
    Math.max(baseScore ?? 0, textScore ?? fallbackScore, fallbackScore)
  );
}

export async function analyzeRegulation(text: string) {
  const analyzeEndpoint =
    import.meta.env.VITE_ANALYZE_ENDPOINT?.trim() ||
    "/default/analyzeRegulationAI";
  const API_URL = analyzeEndpoint.startsWith("http")
    ? analyzeEndpoint
    : analyzeEndpoint.startsWith("/")
    ? analyzeEndpoint
    : `/${analyzeEndpoint}`;

  console.log("🚀 Sending text to Bedrock Lambda:", text.slice(0, 80));
  console.log(JSON.stringify({ text }));
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    console.error(
      "❌ analyzeRegulation fetch failed",
      response.status,
      response.statusText
    );
    throw new Error(`Failed to analyze regulation: ${response.status}`);
  }

  const raw = await response.json();
  console.log("🌐 Bedrock + Finance Lambda raw:", raw);

  // --- unwrap ai block ---
  const ai = raw.ai || {};
  const aiSummary = ai.summary || "";
  const aiSectors = ai.sectors || [];
  const aiCompaniesAtRisk = ai.companies_at_risk || [];
  const aiCompaniesMap = new Map(
    aiCompaniesAtRisk
      .filter((item: any) => item?.ticker)
      .map((item: any) => [String(item.ticker).toUpperCase(), item.reason || ""])
  );
  const aiRiskLevel = ai.risk_level || "Unknown";

  // tickers mentioned by AI
  const companyTickers = aiCompaniesAtRisk
    .map((c: any) => c?.ticker)
    .filter(Boolean);

  // --- unwrap finance block ---
  const finOuter = raw.finance || {};
  const finDeep =
    finOuter && typeof finOuter.finance === "object" ? finOuter.finance : {};

  const finSectorSummary = Array.isArray(finDeep.summary)
    ? finDeep.summary
    : Array.isArray(finOuter.summary)
    ? finOuter.summary
    : [];

  const finTickerSource = Array.isArray(finDeep.tickers)
    ? finDeep.tickers
    : Array.isArray(finOuter.tickers)
    ? finOuter.tickers
    : [];

  const finAction = finDeep.action || finOuter.action || "";
  const overallRiskLabel = aiRiskLevel || finOuter.risk_level || "";
  const defaultRiskValue = fallbackRiskFromLabel(overallRiskLabel);

  // normalize finance entries first so they can be merged with AI hits
  const financeEntries = finTickerSource
    .map((entry: any) => {
      const market = entry?.market ?? {};
      const tickerRaw =
        entry?.ticker ??
        market?.ticker ??
        market?.symbol ??
        (Array.isArray(entry) ? entry[0] : "");
      const ticker = typeof tickerRaw === "string" ? tickerRaw.toUpperCase() : "";
      if (!ticker) return null;

      const metadata = lookupTickerMetadata(ticker);

      const companyName =
        entry?.company ??
        market?.name ??
        market?.longName ??
        market?.shortName ??
        metadata?.name ??
        ticker;

      const riskCandidate = [
        entry?.riskScore,
        entry?.risk,
        entry?.score,
        entry?.baseRisk,
      ].find((value) => typeof value === "number");

      const normalizedRisk = inferRiskScore({
        base: typeof riskCandidate === "number" ? riskCandidate : undefined,
        fallback: defaultRiskValue,
        text: [
          entry?.why ?? "",
          entry?.comment ?? "",
          aiCompaniesMap.get(ticker) ?? "",
          aiSummary,
        ],
      });

      const sectorGuess =
        entry?.sector ??
        market?.sector ??
        metadata?.sector ??
        (Array.isArray(aiSectors) && aiSectors.length > 0
          ? aiSectors[0]
          : "Unknown");

      const comment =
        entry?.why ??
        entry?.comment ??
        aiCompaniesMap.get(ticker) ??
        "";

      return {
        ticker,
        company: companyName,
        risk: normalizedRisk,
        sector: sectorGuess || "Unknown",
        comment: translateToEnglish(comment),
      };
    })
    .filter(Boolean) as Array<{
    ticker: string;
    company: string;
    risk: number;
    sector: string;
    comment: string;
  }>;

  const financeMap = new Map(financeEntries.map((item) => [item.ticker, item]));

  const risk_scores: typeof financeEntries = [];

  // First, ensure AI-flagged companies appear with meaningful data
  for (const company of aiCompaniesAtRisk) {
    const tickerRaw = company?.ticker;
    if (!tickerRaw) continue;
    const ticker = String(tickerRaw).toUpperCase();
    const financeData = financeMap.get(ticker);
    const metadata = lookupTickerMetadata(ticker);

    const resolvedRisk = inferRiskScore({
      base: financeData?.risk,
      fallback: defaultRiskValue,
      text: [
        company?.reason ?? "",
        financeData?.comment ?? "",
        aiSummary,
        finAction,
      ],
    });

    const resolvedComment =
      financeData?.comment ??
      company?.reason ??
      (aiSummary
        ? `Potential exposure due to: ${aiSummary.slice(0, 80)}${aiSummary.length > 80 ? "..." : ""}`
        : "Potential exposure to this regulation");

    risk_scores.push({
      ticker,
      company: financeData?.company ?? metadata?.name ?? ticker,
      risk: clampRisk(resolvedRisk),
      sector:
        financeData?.sector ??
        metadata?.sector ??
        (Array.isArray(aiSectors) && aiSectors.length > 0
          ? aiSectors[0]
          : "Unknown"),
      comment: translateToEnglish(resolvedComment),
    });

    financeMap.delete(ticker);
  }

  // Add any remaining finance entries that were not explicitly called out by AI
  for (const [, entry] of financeMap) {
    const metadata = lookupTickerMetadata(entry.ticker);
    risk_scores.push({
      ticker: entry.ticker,
      company: entry.company ?? metadata?.name ?? entry.ticker,
      risk: inferRiskScore({
        base: entry.risk,
        fallback: defaultRiskValue,
        text: [entry.comment ?? "", aiSummary, finAction],
      }),
      sector:
        entry.sector ??
        metadata?.sector ??
        (Array.isArray(aiSectors) && aiSectors.length > 0
          ? aiSectors[0]
          : "Unknown"),
      comment: translateToEnglish(
        entry.comment ||
        (aiSummary
          ? `Context: ${aiSummary.slice(0, 80)}${aiSummary.length > 80 ? "..." : ""}`
          : "Listed due to potential sector exposure")
      ),
    });
  }

  // portfolio recs
  const recsFromSectors = finSectorSummary.map(
    (s: any) =>
      `${s.sector}: ${translateToEnglish(String(s.suggestion || ""))}`.trim()
  );

  const allRecommendations = [
    ...recsFromSectors,
    finAction ? `Global: ${translateToEnglish(finAction)}` : null,
  ].filter(Boolean) as string[];

  // 👇 THIS is what the UI will see
  const normalized = {
    summary: aiSummary,
    sectors: aiSectors,
    companies: companyTickers,
    risk_scores,
    recommendations: allRecommendations,
    risk_level: aiRiskLevel,
    timestamp: ai.timestamp || finOuter.timestamp || null,
  };

  console.log("✅ Normalized data for UI:", normalized);
  return normalized;
}

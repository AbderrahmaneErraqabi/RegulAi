import { KEYWORD_RULES } from "./keywordWeights";
import { SP500_SAMPLE } from "./sectorMap";
import { getMarketData } from "./fetchMarketData";

export interface RegulationInsight {
  keywords: string[];
  affectedSectors: string[];
  mentionedTickers: string[];
  summary: string; 
}

export interface TickerRisk {
  ticker: string;
  company: string;
  sector: string;
  baseRisk: number;        
  directHitBonus: number;  
  systemicWeight: number;  
  riskScore: number;       
  why: string;             
}

function sectorRiskFromKeywords(
  sector: string,
  keywords: string[]
): { score: number; whyParts: string[] } {
  let score = 0;
  const whyParts: string[] = [];

  for (const kw of keywords) {
    for (const rule of KEYWORD_RULES) {
      const kwLow = kw.toLowerCase();
      const ruleLow = rule.keyword.toLowerCase();

      if (kwLow.includes(ruleLow) && rule.sector === sector) {
        score += rule.weight;
        whyParts.push(`${kw} → ${rule.rationale}`);
      }
    }
  }

  if (score > 1) score = 1;
  return { score, whyParts };
}

export async function computeTickerRisk(
  regInfo: RegulationInsight
): Promise<TickerRisk[]> {
  const results: TickerRisk[] = [];

  for (const company of SP500_SAMPLE) {
    const { score: baseRisk, whyParts } = sectorRiskFromKeywords(
      company.sector,
      regInfo.keywords
    );

    const directHitBonus = regInfo.mentionedTickers.includes(company.ticker)
      ? 0.3
      : 0;

    const mkt = await getMarketData(company.ticker);

    let systemicWeight = 0.3;
    const cap = mkt.marketCap ?? 0;
    if (cap > 500_000_000_000) {
      systemicWeight = 1.0;
    } else if (cap > 100_000_000_000) {
      systemicWeight = 0.6;
    }

    let raw = baseRisk + directHitBonus;
    if (raw > 1) raw = 1;

    let finalScore = raw * systemicWeight;
    if (finalScore > 1) finalScore = 1;

    if (finalScore < 0.05) continue;

    results.push({
      ticker: company.ticker,
      company: company.name,
      sector: company.sector,
      baseRisk,
      directHitBonus,
      systemicWeight,
      riskScore: Number(finalScore.toFixed(2)),
      why: whyParts.join(" | ") || "Exposition sectorielle générale à la mesure réglementaire"
    });
  }

  results.sort((a, b) => b.riskScore - a.riskScore);

  return results;
}
module.exports = {};
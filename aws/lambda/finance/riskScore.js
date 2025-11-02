// aws/lambda/finance/riskScore.js

const { KEYWORD_RULES } = require("./keywordWeights");
const { SP500_SAMPLE } = require("./sectorMap");
const { getMarketData } = require("./fetchMarketData");

// Compute the base sector risk contribution from keywords
function sectorRiskFromKeywords(sector, keywords) {
  let score = 0;
  const whyParts = [];

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

// Compute ticker-level risk metrics
async function computeTickerRisk(regInfo) {
  const results = [];

  for (const company of SP500_SAMPLE) {
    const { score: baseRisk, whyParts } = sectorRiskFromKeywords(
      company.sector,
      regInfo.keywords
    );

    const directHitBonus = regInfo.mentionedTickers.includes(company.ticker)
      ? 0.3
      : 0;

    const mkt = await getMarketData(company.ticker);

    // Systemic weighting based on market cap
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

    if (finalScore < 0.05) continue; // Skip irrelevant risks

    results.push({
      ticker: company.ticker,
      company: company.name,
      sector: company.sector,
      baseRisk,
      directHitBonus,
      systemicWeight,
      riskScore: Number(finalScore.toFixed(2)),
      why:
        whyParts.join(" | ") ||
        "Exposition sectorielle générale à la mesure réglementaire",
    });
  }

  results.sort((a, b) => b.riskScore - a.riskScore);
  return results;
}

module.exports = { computeTickerRisk };
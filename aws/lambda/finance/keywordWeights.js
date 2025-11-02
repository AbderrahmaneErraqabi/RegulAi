// aws/lambda/finance/keywordWeights.js

const KEYWORD_RULES = [
  {
    keyword: "semiconductor",
    sector: "Information Technology",
    weight: 0.9,
    rationale: "Restrictions sur puces / GPU = pression sur revenus des fabricants de puces"
  },
  {
    keyword: "control",
    sector: "Information Technology",
    weight: 0.7,
    rationale: "Contrôle des exports haute technologie vers certains pays"
  },
  {
    keyword: "carbon tax",
    sector: "Industrials",
    weight: 0.8,
    rationale: "Taxe carbone augmente le coût des opérations industrielles/aviation/logistique"
  },
  {
    keyword: "emission standard",
    sector: "Industrials",
    weight: 0.6,
    rationale: "Normes d'émissions plus strictes sur l'aérospatial et le transport"
  },
  {
    keyword: "bank capital requirement",
    sector: "Financials",
    weight: 0.9,
    rationale: "Exigences de fonds propres plus élevées = marge compressée pour les banques"
  },
  {
    keyword: "windfall tax",
    sector: "Energy",
    weight: 0.85,
    rationale: "Taxe exceptionnelle sur profits énergétiques"
  }
];

module.exports = { KEYWORD_RULES };
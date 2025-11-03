const { computeTickerRisk } = require("./riskScore");
const { getMarketData } = require("./fetchMarketData");

async function evaluateRegulatoryImpact({ text, sectors, tickers, summary }) {
  // Example fallback: if Claude didn't give tickers, use top S&P500
  const defaultTickers = ["AAPL", "MSFT", "NVDA", "JPM", "XOM", "META"];
  const chosenTickers = tickers.length ? tickers : defaultTickers.slice(0, 3);

  const results = await Promise.all(
    chosenTickers.map(async (ticker) => {
      const market = await getMarketData(ticker);
      const risk = computeTickerRisk({ ticker, sectors, summary, text });
      return { ...risk, market };
    })
  );

  const sectorSummary = sectors.map((sector) => ({
    sector,
    avgRisk:
      results
        .filter((r) => r.sector === sector)
        .reduce((a, b) => a + (b.riskScore || 0), 0) /
        results.length || 0,
    tickers: results.map((r) => r.ticker),
    suggestion:
      results.some((r) => r.riskScore > 0.6)
        ? `Risque élevé sur ${sector}, surveiller de près.`
        : `Risque faible sur ${sector}, pas d'ajustement immédiat.`,
  }));

  return {
    input_preview: text.slice(0, 80),
    summary,
    sectors,
    tickers: chosenTickers,
    risk_level:
      results.some((r) => r.riskScore > 0.6)
        ? "High"
        : results.some((r) => r.riskScore > 0.3)
        ? "Medium"
        : "Low",
    timestamp: new Date().toISOString(),
    finance: {
      summary: sectorSummary,
      tickers: results,
      action: `Recommandation principale : ${
        results.some((r) => r.riskScore > 0.6)
          ? "Réduire l’exposition aux secteurs sensibles."
          : "Portefeuille globalement stable face à cette régulation."
      }`,
    },
  };
}

module.exports = { evaluateRegulatoryImpact };
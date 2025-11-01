const { computeTickerRisk } = require("./riskScore");
const { buildSectorView, topLevelAction } = require("./suggestions");

/**
 * @typedef {import("./riskScore").RegulationInsight} RegulationInsight
 * @typedef {import("./riskScore").TickerRisk} TickerRisk
 */
/**
 * @typedef {Object} FinanceImpactResult
 * @property {TickerRisk[]} per_ticker
 * @property {ReturnType<typeof buildSectorView>} sector_summary
 * @property {string} action
 */

async function evaluateRegulatoryImpact(regInfo) {
  const tickerRisk = await computeTickerRisk(regInfo);
  const sectorView = buildSectorView(tickerRisk);
  const action = topLevelAction(sectorView);
  return { per_ticker: tickerRisk, sector_summary: sectorView, action };
}

async function demo() {
  const demoReg = {
    keywords: ["carbon tax", "emission standard", "aviation"],
    affectedSectors: ["Industrials"],
    mentionedTickers: ["BA"],
    summary: "Nouvelle taxe carbone sur l'aviation commerciale américaine."
  };
  const res = await evaluateRegulatoryImpact(demoReg);
  console.log(JSON.stringify(res, null, 2));
}

demo();
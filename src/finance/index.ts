import { computeTickerRisk } from "./riskScore";
import { buildSectorView, topLevelAction } from "./suggestions";

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

export async function evaluateRegulatoryImpact(regInfo: any) {
  const tickerRisk = await computeTickerRisk(regInfo);
  const sectorView = buildSectorView(tickerRisk);
  const action = topLevelAction(sectorView);
  return { per_ticker: tickerRisk, sector_summary: sectorView, action };
}

// Optional test demo — disable in production
/*
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
*/
// demo();
// aws/lambda/finance/index.js

const { computeTickerRisk } = require("./riskScore");
const { buildSectorView, topLevelAction } = require("./suggestions");

/**
 * Evaluate the financial impact of a regulatory change.
 * @param {Object} regInfo - Contains keywords, affectedSectors, mentionedTickers, summary
 * @returns {Object} - per_ticker risk, sector summary, and top-level action
 */
async function evaluateRegulatoryImpact(regInfo) {
  const tickerRisk = await computeTickerRisk(regInfo);
  const sectorView = buildSectorView(tickerRisk);
  const action = topLevelAction(sectorView);
  return { per_ticker: tickerRisk, sector_summary: sectorView, action };
}

// Export for use in analyzeRegulation.js
module.exports = { evaluateRegulatoryImpact };
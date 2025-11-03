// aws/lambda/finance/fetchMarketData.js
let yahooFinance;

try {
  // Lambda cold start — load dynamically for compatibility
  yahooFinance = require("yahoo-finance2").default;
} catch (e) {
  console.error("Failed to import yahoo-finance2:", e);
}

async function getMarketData(ticker) {
  try {
    if (!yahooFinance || !yahooFinance.quote) {
      console.error("yahooFinance not properly loaded");
      return { ticker };
    }

    // Use safe call with options
    const quote = await yahooFinance.quote(ticker, {}, { validateResult: false });

    return {
      ticker,
      price: quote?.regularMarketPrice ?? null,
      marketCap: quote?.marketCap ?? null,
      beta: quote?.beta ?? null,
      name: quote?.longName || quote?.shortName || ticker,
    };
  } catch (err) {
    console.error("getMarketData error for", ticker, err);
    return { ticker };
  }
}

module.exports = { getMarketData };
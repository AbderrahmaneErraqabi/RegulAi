// aws/lambda/finance/fetchMarketData.js
const yahooFinance = require("yahoo-finance2").default;

async function getMarketData(ticker) {
  try {
    const quote = await yahooFinance.quote(ticker);

    return {
      ticker,
      price: quote.regularMarketPrice,
      marketCap: quote.marketCap,
      beta: quote.beta,
      name: quote.longName || quote.shortName,
    };
  } catch (err) {
    console.error("getMarketData error for", ticker, err);
    return { ticker };
  }
}

module.exports = { getMarketData };
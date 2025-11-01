const yahooFinance = require("yahoo-finance2").default;

export interface MarketData {
  ticker: string;
  price?: number;
  marketCap?: number;
  beta?: number;
  sector?: string;
  name?: string;
}

export async function getMarketData(ticker: string): Promise<MarketData> {
  try {
    const quote = await yahooFinance.quote(ticker);

    return {
      ticker,
      price: quote.regularMarketPrice,
      marketCap: quote.marketCap,
      beta: quote.beta,
      sector: quote.sector,
      name: quote.longName || quote.shortName
    };
  } catch (err) {
    console.error("getMarketData error for", ticker, err);
    return { ticker };
  }
}
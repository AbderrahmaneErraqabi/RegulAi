// aws/lambda/finance/sectorMap.js

// ✅ Sector mapping — defines which tickers belong to each sector
const SECTOR_MAP = [
  { sector: "Information Technology", tickers: ["AAPL", "MSFT", "NVDA", "AMD", "INTC", "TSM"] },
  { sector: "Financials", tickers: ["JPM", "GS", "BAC", "C", "MS"] },
  { sector: "Energy", tickers: ["XOM", "CVX", "BP", "TOT"] },
  { sector: "Industrials", tickers: ["BA", "CAT", "GE", "HON"] },
  { sector: "Consumer Discretionary", tickers: ["TSLA", "AMZN", "HD", "MCD"] },
  { sector: "Healthcare", tickers: ["JNJ", "PFE", "MRK", "UNH"] },
  { sector: "Utilities", tickers: ["NEE", "DUK", "SO", "EXC"] },
  { sector: "Materials", tickers: ["LIN", "SHW", "APD"] },
  { sector: "Communication Services", tickers: ["GOOGL", "META", "NFLX", "DIS"] },
  { sector: "Real Estate", tickers: ["PLD", "AMT", "CCI"] }
];

// ✅ Fallback sample of S&P 500 tickers (used for mock risk scoring)
const SP500_SAMPLE = [
  { ticker: "AAPL", name: "Apple", sector: "Information Technology" },
  { ticker: "MSFT", name: "Microsoft", sector: "Information Technology" },
  { ticker: "AMZN", name: "Amazon", sector: "Consumer Discretionary" },
  { ticker: "GOOGL", name: "Alphabet", sector: "Communication Services" },
  { ticker: "META", name: "Meta Platforms", sector: "Communication Services" },
  { ticker: "NVDA", name: "NVIDIA", sector: "Information Technology" },
  { ticker: "JPM", name: "JPMorgan Chase", sector: "Financials" },
  { ticker: "TSLA", name: "Tesla", sector: "Consumer Discretionary" },
  { ticker: "UNH", name: "UnitedHealth", sector: "Healthcare" },
  { ticker: "XOM", name: "ExxonMobil", sector: "Energy" }
];

module.exports = { SECTOR_MAP, SP500_SAMPLE };
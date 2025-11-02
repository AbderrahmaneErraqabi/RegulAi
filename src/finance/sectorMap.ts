// src/finance/sectorMap.ts

export interface SectorInfo {
  sector: string;
  tickers: string[];
}

// ✅ Sector mapping — defines which tickers belong to each sector
export const SECTOR_MAP: SectorInfo[] = [
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

// ✅ Fallback sample of S&P 500 tickers if Yahoo Finance is unavailable
export const SP500_SAMPLE = [
  "AAPL", "MSFT", "AMZN", "GOOGL", "META",
  "NVDA", "JPM", "TSLA", "UNH", "V", "PG", "XOM"
];

// ✅ Single correct default export
export default SECTOR_MAP;
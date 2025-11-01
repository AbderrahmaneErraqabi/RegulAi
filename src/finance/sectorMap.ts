export interface SP500Company {
  ticker: string;
  name: string;
  sector: string;
}

export const SP500_SAMPLE: SP500Company[] = [
  { ticker: "AAPL", name: "Apple Inc.", sector: "Information Technology" },
  { ticker: "MSFT", name: "Microsoft Corp.", sector: "Information Technology" },
  { ticker: "NVDA", name: "NVIDIA Corp.", sector: "Information Technology" },

  { ticker: "XOM",  name: "Exxon Mobil Corp.", sector: "Energy" },
  { ticker: "CVX",  name: "Chevron Corp.", sector: "Energy" },

  { ticker: "BA",   name: "Boeing Co.", sector: "Industrials" },
  { ticker: "LMT",  name: "Lockheed Martin", sector: "Industrials" },

  { ticker: "JPM",  name: "JPMorgan Chase & Co.", sector: "Financials" },
  { ticker: "BAC",  name: "Bank of America Corp.", sector: "Financials" }
];

export function getTickersBySector(sector: string): string[] {
  return SP500_SAMPLE
    .filter(c => c.sector === sector)
    .map(c => c.ticker);
}
module.exports = {};
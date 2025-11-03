const TICKER_METADATA: Record<string, { name: string; sector: string }> = {
  AAPL: { name: "Apple Inc.", sector: "Information Technology" },
  MSFT: { name: "Microsoft Corporation", sector: "Information Technology" },
  AMZN: { name: "Amazon.com, Inc.", sector: "Consumer Discretionary" },
  GOOGL: { name: "Alphabet Inc.", sector: "Communication Services" },
  META: { name: "Meta Platforms, Inc.", sector: "Communication Services" },
  NVDA: { name: "NVIDIA Corporation", sector: "Information Technology" },
  AMD: { name: "Advanced Micro Devices, Inc.", sector: "Information Technology" },
  INTC: { name: "Intel Corporation", sector: "Information Technology" },
  ASML: { name: "ASML Holding N.V.", sector: "Semiconductors" },
  JPM: { name: "JPMorgan Chase & Co.", sector: "Financial Services" },
  BHP: { name: "BHP Group Limited", sector: "Materials" },
  TSLA: { name: "Tesla, Inc.", sector: "Consumer Discretionary" },
  UNH: { name: "UnitedHealth Group Incorporated", sector: "Healthcare" },
  XOM: { name: "Exxon Mobil Corporation", sector: "Energy" },
  KO: { name: "The Coca-Cola Company", sector: "Consumer Staples" },
  COST: { name: "Costco Wholesale Corporation", sector: "Consumer Staples" },
  BAC: { name: "Bank of America Corporation", sector: "Financial Services" },
  GS: { name: "Goldman Sachs Group, Inc.", sector: "Financial Services" },
  MT: { name: "ArcelorMittal S.A.", sector: "Materials" },
  X: { name: "United States Steel Corporation", sector: "Materials" },
};

export function lookupTickerMetadata(ticker?: string) {
  if (!ticker) return null;
  return TICKER_METADATA[ticker.toUpperCase()] ?? null;
}

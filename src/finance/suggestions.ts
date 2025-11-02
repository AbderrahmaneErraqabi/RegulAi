import { TickerRisk } from "./riskScore";

export interface SectorSummary {
  sector: string;
  avgRisk: number;
  tickers: string[];
  suggestion: string;
}

export function buildSectorView(risks: TickerRisk[]): SectorSummary[] {
  const bySector: Record<string, { sum: number; count: number; tickers: Set<string> }> = {};

  for (const r of risks) {
    if (!bySector[r.sector]) {
      bySector[r.sector] = { sum: 0, count: 0, tickers: new Set() };
    }
    bySector[r.sector].sum += r.riskScore;
    bySector[r.sector].count += 1;
    bySector[r.sector].tickers.add(r.ticker);
  }

  const out: SectorSummary[] = [];

  for (const [sector, info] of Object.entries(bySector)) {
    const avg = info.sum / info.count;

    let suggestion = "";
    if (avg > 0.6) {
      suggestion = `Réduire l'exposition au secteur ${sector} (rotation hors ${sector})`;
    } else if (avg > 0.3) {
      suggestion = `Surveiller ${sector}, risque modéré`;
    } else {
      suggestion = `Risque faible sur ${sector}, pas d'ajustement immédiat`;
    }

    out.push({
      sector,
      avgRisk: Number(avg.toFixed(2)),
      tickers: Array.from(info.tickers),
      suggestion
    });
  }

  out.sort((a, b) => b.avgRisk - a.avgRisk);

  return out;
}

export function topLevelAction(sectorSummary: SectorSummary[]): string {
  if (sectorSummary.length === 0) {
    return "Aucune réallocation urgente suggérée.";
  }

  const worst = sectorSummary[0];
  if (worst.avgRisk > 0.6) {
    return `Recommandation principale: sortir partiellement du secteur ${worst.sector} et réallouer vers des secteurs moins exposés réglementairement.`;
  }

  if (worst.avgRisk > 0.3) {
    return `Recommandation principale: monitorer ${worst.sector}, impact réglementaire identifié mais pas critique.`;
  }

  return "Recommandation principale: portefeuille globalement stable face à cette régulation.";
}
module.exports = {};
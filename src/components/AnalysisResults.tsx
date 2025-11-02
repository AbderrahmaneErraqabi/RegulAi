import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown, Building2, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface AnalysisResultsProps {
  data: any;
}

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const tickers = data.finance?.tickers || [];
  const sectorSummary = data.finance?.summary || [];
  const action = data.finance?.action || "No action suggested.";

  const getRiskBadge = (risk: number) => {
    if (risk < 0.3) return { label: "Low", variant: "default" as const, icon: TrendingUp };
    if (risk < 0.6) return { label: "Medium", variant: "secondary" as const, icon: Minus };
    return { label: "High", variant: "destructive" as const, icon: TrendingDown };
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "regulai-analysis.json";
    a.click();
    toast.success("Report downloaded successfully!");
  };

  return (
    <section id="results-section" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Analysis Results
            </h2>
            <p className="text-lg text-muted-foreground">
              AI + Financial Insights from your Regulation
            </p>
          </div>

          <div className="space-y-6">
            {/* Summary */}
            <Card className="p-8 bg-card shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                Regulation Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {data.summary}
              </p>
            </Card>

            {/* Sectors */}
            <Card className="p-8 bg-card shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                Detected Sectors
              </h3>
              <div className="flex flex-wrap gap-3">
                {(data.sectors || []).map((sector: string, idx: number) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-base bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {sector}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Finance Summary */}
            <Card className="p-8 bg-card shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                Sector Risk Overview
              </h3>
              <ul className="space-y-3">
                {sectorSummary.map((s: any, idx: number) => (
                  <li key={idx} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{s.sector}</span>
                    <span className="text-muted-foreground">
                      Risk {s.avgRisk} — {s.suggestion}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-primary font-medium">{action}</p>
            </Card>

            {/* Impacted Companies */}
            <Card className="p-8 bg-card shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                Impacted Companies
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {tickers.map((item: any, idx: number) => {
                  const riskInfo = getRiskBadge(item.riskScore || 0);
                  const RiskIcon = riskInfo.icon;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="p-6 border-2 hover:border-primary/50 transition-colors bg-card/50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg text-card-foreground">
                                {item.ticker}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {item.company}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={riskInfo.variant}
                            className="flex items-center gap-1"
                          >
                            <RiskIcon className="w-3 h-3" />
                            {riskInfo.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          {item.why || "General exposure to sector regulation"}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Download Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={handleDownload}
                className="border-primary/50 hover:bg-primary/10"
              >
                <FileDown className="w-5 h-5 mr-2" />
                Download Full Report (JSON)
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalysisResults;
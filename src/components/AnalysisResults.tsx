import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown, Building2, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface AnalysisResultsProps {
  data: {
    summary: string;
    sectors: string[];
    companies: string[];
    risk_scores: Array<{
      ticker: string;
      company: string;
      risk: number;
      sector: string;
      comment: string;
    }>;
    recommendations: string[];
    risk_level?: string;
    timestamp?: string | null;
  };
}

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const getRiskBadge = (risk: number) => {
    if (risk <= 0.3) {
      return { label: "Low", variant: "default" as const, icon: TrendingUp };
    }
    if (risk <= 0.6) {
      return { label: "Medium", variant: "secondary" as const, icon: Minus };
    }
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
              AI-generated insights from your regulatory document
            </p>
            {data.timestamp && (
              <p className="text-xs text-muted-foreground mt-2">
                Generated at {data.timestamp}
              </p>
            )}
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
              {data.sectors.length === 0 ? (
                <p className="text-muted-foreground text-sm italic">
                  No sectors identified.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {data.sectors.map((sector, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="px-4 py-2 text-base bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {sector}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>

            {/* Impacted Companies / Risk */}
            <Card className="p-8 bg-card shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-card-foreground">
                Impacted Companies
              </h3>

              {data.risk_scores.length === 0 ? (
                <p className="text-muted-foreground text-sm italic">
                  No company-level financial exposure calculated.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {data.risk_scores.map((item, idx) => {
                    const riskInfo = getRiskBadge(item.risk ?? 2);
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
                            <Badge variant={riskInfo.variant} className="flex items-center gap-1">
                              <RiskIcon className="w-3 h-3" />
                              {riskInfo.label}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Sector:</strong> {item.sector || "—"}
                          </p>
                          {typeof item.risk === "number" && (
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Risk Score:</strong> {item.risk.toFixed(2)}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground italic">
                            {item.comment}
                          </p>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Portfolio Guidance */}
            <Card className="p-8 bg-card shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
                Portfolio Guidance
              </h3>
              {data.recommendations.length === 0 ? (
                <p className="text-muted-foreground text-sm italic">
                  No portfolio guidance generated for this regulation.
                </p>
              ) : (
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  {data.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm leading-relaxed">
                      {rec}
                    </li>
                  ))}
                </ul>
              )}
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

import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface PortfolioInsightsProps {
  data: any;
}

const PortfolioInsights = ({ data }: PortfolioInsightsProps) => {
  // ✅ Use new backend structure
  const tickers = data.finance?.tickers || [];
  const sorted = [...tickers].sort((a, b) => b.riskScore - a.riskScore);

  const getRiskLevel = (score: number) => {
    if (score < 0.3)
      return { label: "Low Risk", color: "text-green-500", icon: TrendingUp };
    if (score < 0.6)
      return { label: "Medium Risk", color: "text-yellow-500", icon: Minus };
    return { label: "High Risk", color: "text-red-500", icon: TrendingDown };
  };

  if (sorted.length === 0) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>No financial insights available yet. Run an analysis first.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="insights-section" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 text-foreground text-center">
            Portfolio Insights
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Ranked list of companies based on their risk exposure from this regulation.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((item: any, idx: number) => {
              const risk = getRiskLevel(item.riskScore);
              const RiskIcon = risk.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-6 bg-card shadow-md border-l-4 border-primary/60 hover:border-primary transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{item.ticker}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.company}
                        </p>
                      </div>
                      <RiskIcon className={`w-5 h-5 ${risk.color}`} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Sector:</strong> {item.sector}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Risk Score:</strong> {item.riskScore.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {item.why || "General sector exposure"}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioInsights;
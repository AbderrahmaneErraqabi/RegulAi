import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface PortfolioInsightsProps {
  data: {
    recommendations: string[];
    risk_scores: Array<{
      ticker: string;
      company: string;
      risk: number;
      sector: string;
    }>;
  };
}

const PortfolioInsights = ({ data }: PortfolioInsightsProps) => {
  // Sector exposure data
  const sectorData = [
    { sector: "Semiconductors", exposure: 42, risk: "High" },
    { sector: "Technology", exposure: 28, risk: "Medium" },
    { sector: "Manufacturing", exposure: 18, risk: "Medium" },
    { sector: "Energy", exposure: 8, risk: "Low" },
    { sector: "Finance", exposure: 4, risk: "Low" },
  ];

  // Risk distribution data
  const riskData = [
    { name: "High Risk", value: 45, color: "hsl(0 70% 55%)" },
    { name: "Medium Risk", value: 35, color: "hsl(40 90% 60%)" },
    { name: "Low Risk", value: 20, color: "hsl(142 70% 50%)" },
  ];

  // Top companies at risk
  const topRisks = data.risk_scores
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 5);

  const getRiskIcon = (risk: number) => {
    if (risk >= 2) return <TrendingDown className="w-4 h-4 text-destructive" />;
    if (risk === 1) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <TrendingUp className="w-4 h-4 text-green-600" />;
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Portfolio Insights
            </h2>
            <p className="text-lg text-muted-foreground">
              Understand your exposure and optimize your investment strategy
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Sector Exposure Chart */}
            <Card className="p-8 bg-card shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-card-foreground">
                Sector Exposure to Regulation
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sectorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="sector" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="exposure" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Risk Distribution Chart */}
            <Card className="p-8 bg-card shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-card-foreground">
                Portfolio Risk Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Top Companies at Risk Table */}
          <Card className="p-8 bg-card shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-6 text-card-foreground">
              Top 5 Companies at Risk
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Ticker</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Sector</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  {topRisks.map((item, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="font-mono">
                          {item.ticker}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-card-foreground">{item.company}</td>
                      <td className="py-4 px-4 text-muted-foreground">{item.sector}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getRiskIcon(item.risk)}
                          <span className="font-semibold">{item.risk === 2 ? "High" : item.risk === 1 ? "Medium" : "Low"}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recommended Actions */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-card-foreground flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-primary" />
              Recommended Actions
            </h3>
            <div className="space-y-4">
              {data.recommendations.map((rec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-semibold">{idx + 1}</span>
                  </div>
                  <p className="text-card-foreground leading-relaxed">{rec}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioInsights;

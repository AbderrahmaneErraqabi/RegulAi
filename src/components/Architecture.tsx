import { Card } from "@/components/ui/card";
import { Cloud, Database, Brain, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const techStack = [
  {
    icon: Brain,
    title: "AWS Bedrock",
    description: "Advanced AI models for regulatory text analysis and NLP",
  },
  {
    icon: Database,
    title: "AWS Comprehend",
    description: "Entity recognition and sentiment analysis for financial context",
  },
  {
    icon: Cloud,
    title: "Yahoo Finance API",
    description: "Real-time stock data and S&P 500 company information",
  },
  {
    icon: LineChart,
    title: "AWS QuickSight",
    description: "Data visualization and interactive portfolio dashboards",
  },
];

const Architecture = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              RegulAI leverages cutting-edge AWS services to deliver intelligent financial insights from regulatory documents
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full border-2 hover:border-primary/50 transition-all duration-300 bg-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <tech.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-card-foreground">
                        {tech.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pipeline Diagram */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-semibold mb-6 text-center text-card-foreground">
              Analysis Pipeline
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {[
                { step: "1", label: "Document Upload", desc: "Regulatory text input" },
                { step: "2", label: "AI Analysis", desc: "AWS Bedrock + Comprehend" },
                { step: "3", label: "Market Mapping", desc: "S&P 500 correlation" },
                { step: "4", label: "Insights", desc: "Portfolio recommendations" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center flex-1">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-card-foreground mb-1">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  {idx < 3 && (
                    <div className="hidden md:block absolute w-full h-0.5 bg-gradient-to-r from-primary to-accent opacity-30" style={{ left: "50%", top: "2rem" }} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;

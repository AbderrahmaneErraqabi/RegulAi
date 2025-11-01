import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Legal Analysis",
    description: "Advanced NLP models extract key insights from complex regulatory documents in seconds.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Market Impact",
    description: "Instantly identify which sectors and companies are affected by new regulations.",
  },
  {
    icon: Target,
    title: "Portfolio Optimization",
    description: "Get actionable recommendations to rebalance your portfolio based on regulatory changes.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Why Choose RegulAI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform regulatory complexity into strategic advantage with cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

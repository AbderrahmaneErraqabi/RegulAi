import { Button } from "@/components/ui/button";
import { ArrowRight, Brain } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(250_70%_98%),hsl(270_50%_96%))]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg mb-8"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.2] md:leading-[1.2] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
            RegulAI
          </h1>
          
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            Turning Regulation into Financial Strategy
          </p>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Analyze global regulations, assess risk exposure, and adapt your portfolio instantly with AI-powered insights.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={scrollToUpload}
            className="group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
          >
            Upload a Regulation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Stats or Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
              <span>S&P 500 Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "1s" }} />
              <span>Real-Time Insights</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

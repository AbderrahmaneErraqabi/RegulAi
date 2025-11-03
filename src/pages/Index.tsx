import { useState } from "react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Upload from "@/components/Upload";
import AnalysisResults from "@/components/AnalysisResults";
import PortfolioInsights from "@/components/PortfolioInsights";
import Architecture from "@/components/Architecture";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<any>(null);
  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            RegulAI
          </h1>
          <Button
            variant="ghost"
            onClick={() => navigate("/about")}
            className="hover:bg-primary/10"
          >
            About
          </Button>
        </div>
      </nav>

      {/* Main Sections */}
      <div className="pt-16">
        <Hero />
        <Features />
        <Upload onAnalysisComplete={handleAnalysisComplete} />
        
        {analysisData && (
          <>
            <AnalysisResults data={analysisData} />
            <PortfolioInsights data={analysisData} />
          </>
        )}
        
        <Architecture />
        <Footer />
      </div>
    </div>
  );
};

export default Index;

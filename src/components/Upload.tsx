import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload as UploadIcon, FileText, Loader2, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface UploadProps {
  onAnalysisComplete: (data: any) => void;
}

const Upload = ({ onAnalysisComplete }: UploadProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast.error("Please enter or upload regulatory content");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockResponse = {
        summary: "This regulation introduces a 15% tax on imported semiconductors in the US, affecting major technology companies with significant supply chain dependencies in Asia.",
        sectors: ["Semiconductors", "Technology", "Manufacturing"],
        companies: ["NVIDIA", "AMD", "Intel", "TSMC"],
        risk_scores: [
          { ticker: "NVDA", company: "NVIDIA", risk: 2, sector: "Semiconductors", comment: "High import dependency" },
          { ticker: "AMD", company: "AMD", risk: 2, sector: "Semiconductors", comment: "Significant exposure" },
          { ticker: "INTC", company: "Intel", risk: 1, sector: "Semiconductors", comment: "Domestic manufacturing" },
          { ticker: "TSM", company: "TSMC", risk: 2, sector: "Semiconductors", comment: "Major supplier impact" },
        ],
        recommendations: [
          "Reduce exposure to US semiconductor companies with high import dependency",
          "Increase clean energy sector allocation as alternative growth opportunity",
          "Diversify geographically toward EU markets with favorable trade policies",
        ],
      };

      setIsLoading(false);
      onAnalysisComplete(mockResponse);
      toast.success("Analysis complete!");
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }, 2500);
  };

  return (
    <section id="upload-section" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Upload Your Regulation
            </h2>
            <p className="text-lg text-muted-foreground">
              Paste the regulatory text below or upload a document for AI-powered analysis.
            </p>
          </div>

          <Card className="p-8 bg-card shadow-lg">
            <div className="space-y-6">
              {/* Upload Icon */}
              <div className="flex items-center justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Textarea */}
              <Textarea
                placeholder="Drop your regulation here or paste the content... 

Example: 'This regulation introduces a 15% tax on imported semiconductors effective Q2 2025...'"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] text-base resize-none border-border focus:border-primary transition-colors"
              />

              {/* File Upload Button */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors"
                  onClick={() => toast.info("File upload coming soon!")}
                >
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload PDF or TXT
                </Button>
              </div>

              {/* Analyze Button */}
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Regulation...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  <p>Processing regulatory text with AWS Bedrock...</p>
                  <p className="mt-1">Detecting entities with AWS Comprehend...</p>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Upload;

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload as UploadIcon, FileText, Loader2, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

// ✅ Import backend API functions
import { analyzeRegulation } from "@/api/analyze";
import { uploadFile } from "@/api/upload";

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

    try {
      // 1️⃣ Send text to AWS Lambda (your deployed backend)
      console.log("➡️ Sending text to AWS Lambda...");
      const analysis = await analyzeRegulation(content);
      console.log("✅ AWS Lambda analysis result:", analysis);

      // 2️⃣ Upload the JSON result to S3 for storage
      console.log("➡️ Uploading combined analysis to S3...");
      const fileName = `analysis-${Date.now()}.json`;
      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(analysis, null, 2))));
      const uploadResponse = await uploadFile(fileName, contentBase64);
      console.log("✅ Upload response:", uploadResponse);

      // 3️⃣ Pass result to the UI
      onAnalysisComplete(analysis);
      toast.success("Analysis complete!");

      // 4️⃣ Smooth scroll to results
      setTimeout(() => {
        document
          .getElementById("results-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      console.error("❌ Error during analysis or upload:", err);
      toast.error("An error occurred during analysis or upload.");
    } finally {
      setIsLoading(false);
    }
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
              Paste the regulatory text below or upload a document for
              AI-powered analysis.
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
                placeholder={`Drop your regulation here or paste the content...

Example: "This regulation introduces a 15% tax on imported semiconductors effective Q2 2025..."`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] text-base resize-none border-border focus:border-primary transition-colors"
              />

              {/* File Upload Button (future feature) */}
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

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  <p>Processing regulatory text with AWS Bedrock...</p>
                  <p className="mt-1">Calculating financial impact...</p>
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
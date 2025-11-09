import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload as UploadIcon,
  FileText,
  Loader2,
  Brain,
  PlayCircle,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

import { analyzeRegulation } from "@/api/analyze";
import { uploadFile } from "@/api/upload";
import { DEMO_VIDEO_URL, IS_DEMO_MODE } from "@/config/demo";

interface UploadProps {
  onAnalysisComplete: (data: any) => void;
}

const Upload = ({ onAnalysisComplete }: UploadProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollToDemoVideo = () => {
    const section = document.getElementById("demo-video-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(DEMO_VIDEO_URL, "_blank", "noopener,noreferrer");
    }
  };

  const handleAnalyze = async () => {
    if (IS_DEMO_MODE) {
      toast.info(
        "The live AI pipeline is offline. Scroll down to watch the recorded demo instead."
      );
      scrollToDemoVideo();
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter or upload regulatory content");
      return;
    }

    setIsLoading(true);

    try {
      console.log("➡️ Sending text to AWS Lambda (Bedrock + Finance)...");
      const analysis = await analyzeRegulation(content);
      console.log("✅ Full normalized analysis for UI:", analysis);

      // Push data up to parent (App) so <AnalysisResults /> renders it immediately
      onAnalysisComplete(analysis);
      toast.success("Analysis complete!");

      // Save report JSON to S3 (optional upload step you already wired)
      const fileName = `analysis-${Date.now()}.json`;
      const contentBase64 = btoa(
        unescape(encodeURIComponent(JSON.stringify(analysis, null, 2)))
      );
      try {
        const uploadResponse = await uploadFile(fileName, contentBase64);
        console.log("✅ Upload response:", uploadResponse);
      } catch (uploadErr) {
        console.warn("⚠️ Upload to S3 failed (analysis still ready):", uploadErr);
        toast.warning("Analysis ready, but saving the report to S3 failed.");
      }

      // Smooth scroll to results
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
              {IS_DEMO_MODE && (
                <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Bedrock access is paused for the PolyFinances Datathon.</span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                    Watch the recorded flow below while we wait for AWS access to be restored.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border border-primary/50"
                    onClick={scrollToDemoVideo}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Watch Demo Video
                  </Button>
                </div>
              )}

              {/* Icon */}
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

              {/* Upload button (not wired yet, fine) */}
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

              {/* Analyze button */}
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
              >
                {IS_DEMO_MODE ? (
                  <>
                    <PlayCircle className="w-5 h-5 mr-2" />
                    View Demo Experience
                  </>
                ) : isLoading ? (
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

              {/* Loading text */}
              {isLoading && !IS_DEMO_MODE && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  <p>Processing text with AWS Bedrock...</p>
                  <p className="mt-1">Calculating financial exposure...</p>
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

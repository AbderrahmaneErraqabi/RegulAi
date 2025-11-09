import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { DEMO_VIDEO_URL } from "@/config/demo";

const DemoVideo = () => {
  return (
    <section id="demo-video-section" className="py-24 bg-card/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-12 bg-card shadow-2xl">
            <div className="text-center mb-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <PlayCircle className="w-4 h-4" />
                Demo Mode
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground">
                Watch the RegulAI Experience
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                AWS Bedrock access is paused for the PolyFinances Datathon environment, so we recorded a quick walkthrough showing
                how the regulation ingestion, AI analysis, and portfolio insights flow together.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-border shadow-lg bg-black">
              <div className="aspect-video">
                <iframe
                  title="RegulAI Demo"
                  src={DEMO_VIDEO_URL}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideo;

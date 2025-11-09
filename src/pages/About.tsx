import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Abderrahmane Er-Raqabi",
      role: "Electrical Engineer",
      expertise: "Architects the Bedrock-powered AI workflow and keeps the power-systems rigor behind every inference.",
      photo: "/Abderrhmane.png",
    },
    {
      name: "Mohamed Amine Amroun",
      role: "Software Engineer",
      expertise: "Builds the serverless stack (API Gateway + Lambda) and the front-end that surfaces real-time insights.",
    },
    {
      name: "Mohamed Amine Chakhari",
      role: "Electrical Engineer",
      expertise: "Transforms regulatory signals into structured data pipelines and market-impact features.",
      photo: "/Chakhari.png",
    },
    {
      name: "Badr El Moustafid",
      role: "Aerospace Engineer",
      expertise: "Applies control-systems discipline to portfolio simulations, stress tests, and risk scoring.",
    },
  ];

  const architectureFlow = [
    {
      title: "1. User Interface (RegulAI Web App)",
      description:
        "React/Vite single-page experience where analysts paste regulations or upload documents before triggering the workflow.",
      bullets: [
        "Validates inputs client-side and streams status updates to keep users informed.",
        "Calls `POST /analyze-regulation` with the full text plus metadata such as source, jurisdiction, and language.",
      ],
    },
    {
      title: "2. API & Orchestration (API Gateway + Lambda)",
      description:
        "AWS API Gateway fronts the serverless backend. The `analyzeRegulation` Lambda sanitizes payloads, stores raw files in S3, and sequences every downstream service call.",
      bullets: [
        "Ensures idempotent requests and logs trace IDs for observability.",
        "Persists raw regulations under `s3://regulations/raw/{id}.txt` for auditability.",
      ],
    },
    {
      title: "3. AI Understanding (AWS Bedrock + Comprehend)",
      description:
        "Bedrock handles summarization, tone detection, and impact classification, while Comprehend extracts fine-grained entities (ORG, GPE, MONEY, DATE).",
      bullets: [
        "Bedrock prompt frames the regulation context and requests a structured JSON payload (summary, sectors, impact type, tone).",
        "Comprehend's entity list feeds the downstream market data lookup.",
      ],
    },
    {
      title: "4. Market Data Enrichment (Yahoo Finance API)",
      description:
        "Detected companies and sectors are matched to tickers, then enriched with live pricing, volatility, and market-cap metrics.",
      bullets: [
        "Supports S&P 500 mapping plus custom portfolios.",
        "Normalizes responses into a canonical security schema consumed by the portfolio engine.",
      ],
    },
    {
      title: "5. Portfolio Analytics Engine",
      description:
        "Custom scoring logic combines AI output, market data, and portfolio weights to quantify regulatory risk and craft recommendations.",
      bullets: [
        "Calculates sector exposure deltas, company-level risk (0–1), and hedging guidance.",
        "Returns actionable insights to the frontend and archives snapshots for longitudinal analysis.",
      ],
    },
    {
      title: "6. Insights & Visualization (Frontend + QuickSight)",
      description:
        "The React UI highlights immediate insights, while AWS QuickSight connects to curated S3/Redshift datasets for rich BI dashboards.",
      bullets: [
        "Dashboards track risk trends, compare scenarios, and surface top exposed holdings.",
        "Supports jury/client demos with enterprise-ready visualizations.",
      ],
    },
  ];

  const architectureJson = {
    frontend: {
      tech: "React/Vite",
      actions: ["upload_regulation", "view_insights"],
    },
    api_layer: {
      gateway: "AWS API Gateway",
      lambdas: ["analyzeRegulation", "storeAnalytics"],
    },
    ai: {
      bedrock: {
        task: "summarization + classification",
        output: ["summary", "sectors_hint", "impact_type", "tone"],
      },
      comprehend: {
        task: "entity_extraction",
        entities: ["ORG", "GPE", "PERCENT", "MONEY", "DATE"],
      },
    },
    market_data: {
      source: "Yahoo Finance API",
      usage: ["get_price", "sector_info", "volatility"],
    },
    portfolio_engine: {
      inputs: ["ai_output", "market_data", "portfolio_weights"],
      outputs: ["company_risks", "sector_exposure", "recommendations"],
    },
    analytics: {
      storage: "S3",
      bi_tool: "AWS QuickSight",
    },
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,hsl(250_70%_98%),hsl(270_50%_97%))]">
      {/* Header */}
      <header className="py-6 px-6 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            RegulAI
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              About RegulAI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              RegulAI transforms complex regulatory documents into actionable portfolio insights using cutting-edge AI technology. Built for the PolyFinances Datathon 2025.
            </p>
          </motion.div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "Democratize regulatory analysis for financial professionals and investors worldwide.",
              },
              {
                icon: Zap,
                title: "Our Approach",
                description: "Leverage AWS AI services to deliver real-time, accurate market impact assessments.",
              },
              {
                icon: Users,
                title: "Our Impact",
                description: "Empower better investment decisions through intelligent regulatory interpretation.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <Card className="p-6 h-full bg-card hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <Card className="p-8 mb-16 bg-card">
            <h3 className="text-3xl font-bold mb-8 text-center text-card-foreground">
              Meet the Team
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  {member.photo ? (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border border-border shadow-sm bg-muted">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                        style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <h4 className="font-semibold text-lg text-card-foreground mb-1">
                    {member.name}
                  </h4>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Architecture Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-3xl font-bold mb-4 text-center text-card-foreground">
              System Architecture
            </h3>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto">
              From the moment a regulation is uploaded to the instant portfolio recommendations and dashboards are refreshed,
              RegulAI runs through a tightly orchestrated, fully serverless pipeline. The overview below mirrors the diagram used in our
              Architecture section and investor materials.
            </p>

            <div className="mt-10 space-y-6">
              {architectureFlow.map((stage, idx) => (
                <div
                  key={stage.title}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-primary font-semibold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-card-foreground mb-2">
                        {stage.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {stage.description}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {stage.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-card border border-dashed border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-card-foreground">Codex-Friendly Snapshot</h4>
                  <p className="text-xs text-muted-foreground">
                    JSON contract used by the dev team, LLM prompts, and diagramming tools.
                  </p>
                </div>
              </div>
              <pre className="text-xs bg-muted/40 rounded-xl p-4 overflow-x-auto">
{JSON.stringify(architectureJson, null, 2)}
              </pre>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

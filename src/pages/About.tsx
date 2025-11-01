import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { name: "Team Member 1", role: "AI Engineer", expertise: "AWS Bedrock & NLP" },
    { name: "Team Member 2", role: "Financial Analyst", expertise: "Portfolio Strategy" },
    { name: "Team Member 3", role: "Full-Stack Developer", expertise: "React & Cloud" },
    { name: "Team Member 4", role: "Data Scientist", expertise: "Machine Learning" },
  ];

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
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="font-semibold text-lg text-card-foreground mb-1">
                    {member.name}
                  </h4>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Architecture Diagram Placeholder */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-3xl font-bold mb-6 text-center text-card-foreground">
              System Architecture
            </h3>
            <div className="bg-card rounded-lg p-12 border-2 border-dashed border-border flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-6 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-primary" />
                </div>
                <p className="text-xl font-semibold text-muted-foreground mb-2">
                  Architecture Diagram
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  AWS Bedrock → AWS Comprehend → Yahoo Finance API → AWS QuickSight → Portfolio Insights
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

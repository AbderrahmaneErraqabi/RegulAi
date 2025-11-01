import { Github, Linkedin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold mb-2">
              Built with ❤️ for PolyFinances Datathon 2025
            </p>
            <p className="text-sm opacity-80">
              Transforming regulatory complexity into strategic advantage
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm">Team</span>
            </a>
            <a
              href="https://devpost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm">Devpost</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm opacity-70">
          <p>© 2025 RegulAI. Powered by AWS, React, and AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

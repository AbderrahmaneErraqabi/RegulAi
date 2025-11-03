import { Github, Linkedin } from "lucide-react";

const team = [
  {
    name: "Abderrahmane Er Raqabi",
    href: "https://www.linkedin.com/in/abderrahmane-er-raqabi-7381b0354/",
  },
  {
    name: "Mohamed Amine Chakhari",
    href: "https://www.linkedin.com/in/mohamed-amine-chakhari-a396a2381/",
  },
  {
    name: "Badr El Moustafid",
    href: "https://www.linkedin.com/in/badr-el-moustafid-7200a6343/",
  },
  {
    name: "Mohamed Amine Amroun",
    href: "https://www.linkedin.com/in/mohamed-amine-amroun-6358b8389/",
  },
];

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold mb-2">
              RegulAI · PolyFinances Datathon 2025
            </p>
            <p className="text-sm opacity-80">
              AI-driven regulatory intelligence for faster financial decisions.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/AbderrahmaneErraqabi/RegulAi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {team.map((member) => (
                <a
                  key={member.name}
                  href={member.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>{member.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm opacity-70">
          <p>© 2025 RegulAI. Powered by AWS, React, and Bedrock AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

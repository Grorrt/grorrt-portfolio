import { Github, FileDown, ArrowRight } from 'lucide-react';
import heroWorkspaceImg from '../assets/images/hero_dev_workspace_1790953344829.jpg';
import avatarImg from '../assets/images/avatar_grorrt_developer_1790953380893.jpg';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenResumeModal: () => void;
}

export default function Hero({ onExploreProjects, onOpenResumeModal }: HeroProps) {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic impact and recruiter value prop */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status indicator - clean unboxed typography without pills */}
            <div className="flex items-center gap-3 text-xs tracking-wide text-neutral-600 dark:text-neutral-400 font-mono">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Senior Software & Systems Engineering Roles</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-display leading-[1.08] text-balance">
              Architecting AI Tooling, MCP Engines & Resilient Systems.
            </h1>

            {/* Subhead / Value Proposition */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              Hi, I'm <strong className="font-semibold text-neutral-900 dark:text-white">Grorrt</strong>. 
              I design and build distributed developer platforms, local-first automated QA engines (VerityQA), 
              Model Context Protocol (MCP) toolkits (LeadForge), and binary analysis security utilities.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`${import.meta.env.BASE_URL}Grorrt_Resume.pdf`}
                download="Grorrt_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <FileDown className="w-4 h-4 text-neutral-500" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href="https://github.com/Grorrt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <Github className="w-4 h-4 text-neutral-500" />
                <span>github.com/Grorrt</span>
              </a>
            </div>

            {/* Quantitative Rigor Proof Strip */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono tabular-nums">
                  5
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Core Repositories
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono tabular-nums">
                  10+
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  MCP Protocol Tools
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white font-mono tabular-nums">
                  100%
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Open Source Code
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-md">
              <img
                src={heroWorkspaceImg}
                alt="Minimalist software engineering workspace"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              
              {/* Bottom Card Overlay with Developer Avatar */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarImg}
                    alt="Grorrt avatar"
                    className="w-11 h-11 rounded-lg object-cover border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-sm font-semibold tracking-tight text-neutral-100 font-display">
                      Grorrt
                    </div>
                    <div className="text-xs text-neutral-400 font-mono">
                      @Grorrt on GitHub
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenResumeModal}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                >
                  View CV
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

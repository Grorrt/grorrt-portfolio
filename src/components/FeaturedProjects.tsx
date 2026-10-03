import { Github, ArrowUpRight, Cpu, CheckCircle2, Layers } from 'lucide-react';
import { ProjectItem } from '../types';
import leadforgeImg from '../assets/images/project_leadforge_mcp_1790953356187.jpg';
import verityQaImg from '../assets/images/project_verity_qa_1790953369883.jpg';

interface FeaturedProjectsProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenContactWithProject: (projectName: string) => void;
}

export default function FeaturedProjects({
  projects,
  onSelectProject,
  onOpenContactWithProject,
}: FeaturedProjectsProps) {
  const leadforge =
    projects.find((p) => p.name === 'leadforge-mcp') ||
    projects[0];

  const verityQa =
    projects.find((p) => p.name === 'qa-ai-assistant') ||
    projects[1];

  return (
    <section id="featured" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
              RECRUITER SPOTLIGHT
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-display mt-1">
              Featured Flagship Systems
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mt-2">
              High-impact architectures demonstrating AI protocol design, automated QA pipelines, and full-stack rigor.
            </p>
          </div>

          {/* CTA: View All Projects on GitHub */}
          <a
            href="https://github.com/Grorrt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shrink-0 shadow-xs"
          >
            <span>View All Projects on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 2 Flagship Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: LeadForge MCP */}
          {leadforge && (
            <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                {/* Visual Header */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-950">
                  <img
                    src={leadforgeImg}
                    alt="LeadForge MCP architecture visual"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Unboxed category metadata */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <Cpu className="w-3.5 h-3.5 text-sky-400" />
                    <span>Model Context Protocol (MCP)</span>
                    <span aria-hidden="true">·</span>
                    <span>10 Agent Tools</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 font-display">
                        LeadForge MCP
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                        <span>JavaScript</span>
                        <span aria-hidden="true">·</span>
                        <span>Multi-factor ICP Engine</span>
                        <span aria-hidden="true">·</span>
                        <span>HubSpot / Salesforce Sync</span>
                      </div>
                    </div>

                    <a
                      href={leadforge.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="View repository on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {leadforge.custom_description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>10 MCP Tools:</strong> Domain lookup, buying intent signals, persona enrichment, CRM export</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Scoring Pipeline:</strong> 4-tier weighting matrix with audit trails for deterministic agent qualification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Universal Compatibility:</strong> Works natively with Claude Desktop, Cursor, and custom MCP clients</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => onSelectProject(leadforge)}
                  className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1"
                >
                  <span>Architecture & Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenContactWithProject('LeadForge MCP')}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
                >
                  Discuss This Project
                </button>
              </div>
            </div>
          )}

          {/* Card 2: VerityQA */}
          {verityQa && (
            <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                {/* Visual Header */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-950">
                  <img
                    src={verityQaImg}
                    alt="VerityQA automated testing architecture"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Unboxed category metadata */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Quality Assurance & Testing</span>
                    <span aria-hidden="true">·</span>
                    <span>Local-First Design</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 font-display">
                        qa-ai-assistant (VerityQA)
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                        <span>Python (FastAPI)</span>
                        <span aria-hidden="true">·</span>
                        <span>JavaScript / React</span>
                        <span aria-hidden="true">·</span>
                        <span>Playwright / PyTest</span>
                      </div>
                    </div>

                    <a
                      href={verityQa.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="View repository on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {verityQa.custom_description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Requirement-to-Review Flow:</strong> Converts text PRDs into deterministic invariants without hallucinated assertions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Structured Test Output:</strong> Synthesizes strict Pydantic test specs conforming to local codebase rules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Local-First Architecture:</strong> Zero sensitive source code leaks; runs entirely within workstation perimeter</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => onSelectProject(verityQa)}
                  className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1"
                >
                  <span>Architecture & Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenContactWithProject('VerityQA')}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
                >
                  Discuss This Project
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

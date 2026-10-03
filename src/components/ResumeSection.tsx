import { useState } from 'react';
import { FileDown, Github, ArrowUpRight, CheckCircle2, Eye, Printer } from 'lucide-react';

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState<'preview' | 'skills'>('preview');

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/40 dark:bg-neutral-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
              CURRICULUM VITAE & CREDENTIALS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-display mt-1">
              Resume & Technical Background
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mt-2">
              Hosted in the public directory and cached for instantaneous recruiter access across desktop and mobile.
            </p>
          </div>

          {/* Prompt specified: button labeled "Download Resume (PDF)" and secondary link to "View GitHub Profile" */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`${import.meta.env.BASE_URL}Grorrt_Resume.pdf`}
              download="Grorrt_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href="https://github.com/Grorrt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <Github className="w-4 h-4 text-neutral-500" />
              <span>View GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* Interactive In-Page Resume Card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs">
          
          {/* Top Bar of Resume Card */}
          <div className="p-4 sm:p-6 border-b border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-neutral-50/50 dark:bg-neutral-950/40">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Full CV Document
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'skills'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Skills Matrix Breakdown
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                title="Print resume"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <a
                href={`${import.meta.env.BASE_URL}Grorrt_Resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                title="Open raw PDF in new browser tab"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Raw PDF</span>
              </a>
            </div>
          </div>

          {/* Tab 1: Full CV View */}
          {activeTab === 'preview' && (
            <div className="p-6 sm:p-10 space-y-8 max-w-4xl mx-auto">
              
              {/* Header */}
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 space-y-2">
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 font-display">
                  Grorrt
                </h3>
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  Full-Stack Systems & AI Software Engineer
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-1">
                  <span>github.com/Grorrt</span>
                  <span aria-hidden="true">·</span>
                  <span>Available for Full-Time & Contract Engineering</span>
                  <span aria-hidden="true">·</span>
                  <span>Open to Relocation / Remote</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Professional Summary
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Systems software engineer with deep specialization in protocol-level AI integrations (Model Context Protocol), local-first automated quality assurance frameworks, and forensic binary analysis. Proven record of designing deterministic pipelines, high-throughput microservices, and maintainable full-stack software.
                </p>
              </div>

              {/* Selected Key Engineering Projects */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Highlighted Engineering Work
                </h4>

                <div className="space-y-5">
                  {/* LeadForge MCP */}
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        LeadForge MCP — AI Lead Qualification Engine
                      </div>
                      <div className="text-xs font-mono text-neutral-500">JavaScript · Model Context Protocol</div>
                    </div>
                    <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 list-disc pl-4 leading-relaxed">
                      <li>Designed and registered 10 MCP-compliant tools allowing Claude Desktop and Cursor to perform real-time domain lookups and intent detection.</li>
                      <li>Engineered a 4-dimensional ICP scoring matrix with full audit trails for deterministic qualification decisions.</li>
                      <li>Implemented automated bi-directional CRM export synchronization targeting HubSpot and Salesforce REST APIs.</li>
                    </ul>
                  </div>

                  {/* VerityQA */}
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        VerityQA (qa-ai-assistant) — Automated Quality Assurance Platform
                      </div>
                      <div className="text-xs font-mono text-neutral-500">FastAPI · Python · React</div>
                    </div>
                    <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 list-disc pl-4 leading-relaxed">
                      <li>Built an asynchronous FastAPI server converting loose PRDs and feature tickets into deterministic state invariants.</li>
                      <li>Designed a local-first React review console where developers inspect and accept synthetic PyTest and Playwright suites without cloud leakage.</li>
                      <li>Achieved sub-200ms parsing latency for complex multi-screen workflow specifications.</li>
                    </ul>
                  </div>

                  {/* Malware Analysis Toolkit */}
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Malware Analysis Toolkit by Grorrt — Static PE Analysis Framework
                      </div>
                      <div className="text-xs font-mono text-neutral-500">Python · PEFile · YARA</div>
                    </div>
                    <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 list-disc pl-4 leading-relaxed">
                      <li>Created a command-line and programmatic framework parsing portable executable headers, section metadata, and exported symbols.</li>
                      <li>Integrated Shannon entropy heatmap calculation to flag obfuscated and packed payload sections.</li>
                      <li>Implemented YARA rule compiler and imphash generation for rapid incident response triage.</li>
                    </ul>
                  </div>

                  {/* Atlas Core */}
                  <div className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Atlas Core — Enterprise Full-Stack Foundation
                      </div>
                      <div className="text-xs font-mono text-neutral-500">Python · TypeScript · PostgreSQL</div>
                    </div>
                    <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1 list-disc pl-4 leading-relaxed">
                      <li>Architected modular backend API gateway with OpenAPI contract validation and rate-limiting middleware.</li>
                      <li>Developed declarative database schema migration pipeline ensuring zero-downtime rollouts.</li>
                      <li>Authored comprehensive test suites spanning unit, integration, and load testing.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education & Core Competencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Technical Stack
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-mono">
                    Python, TypeScript, JavaScript, FastAPI, React, Node.js, Vite, Tailwind CSS, Model Context Protocol (MCP), PyTest, Playwright, Git, Docker, REST, GraphQL.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Engineering Principles
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Local-first privacy, deterministic assertion pipelines, zero-pill typography, clean domain boundaries, automated CI/CD validation.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Skills Matrix */}
          {activeTab === 'skills' && (
            <div className="p-6 sm:p-10 space-y-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-3">
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Languages</div>
                  <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Python</span>
                      <span className="font-mono text-neutral-400">Senior (FastAPI, Security)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">TypeScript</span>
                      <span className="font-mono text-neutral-400">Advanced (React, Node)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">JavaScript</span>
                      <span className="font-mono text-neutral-400">Proficient (MCP SDK)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">SQL / Bash</span>
                      <span className="font-mono text-neutral-400">Operational</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-3">
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">AI & Tooling</div>
                  <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Model Context Protocol</span>
                      <span className="font-mono text-emerald-500">10 Tools Shipped</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Agent Tool Schemas</span>
                      <span className="font-mono text-neutral-400">Strict JSON-Schema</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Synthetic QA Pipelines</span>
                      <span className="font-mono text-neutral-400">AST Analysis</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Local-First Architecture</span>
                      <span className="font-mono text-neutral-400">Zero data egress</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-3">
                  <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Security & Systems</div>
                  <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">PE Binary Parsing</span>
                      <span className="font-mono text-neutral-400">pefile, headers</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Shannon Entropy</span>
                      <span className="font-mono text-neutral-400">Packer detection</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">YARA Signatures</span>
                      <span className="font-mono text-neutral-400">Heuristics triage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Database Migrations</span>
                      <span className="font-mono text-neutral-400">Declarative schemas</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

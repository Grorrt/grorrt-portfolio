import { Github, ArrowUpRight, Terminal, Shield, Cpu, Box } from 'lucide-react';
import ContributionGraph from './ContributionGraph';

export default function AboutSection() {
  return (
    <section id="activity" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/40 dark:bg-neutral-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
              ENGINEERING PHILOSOPHY & ACTIVITY
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-display mt-1">
              About & GitHub Activity
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mt-2">
              Focusing on high-leverage developer tooling, protocol-level AI integration, and deterministic software verification.
            </p>
          </div>

          <a
            href="https://github.com/Grorrt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs shrink-0"
          >
            <Github className="w-3.5 h-3.5" />
            <span>github.com/Grorrt</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Contribution Graph Heatmap Component */}
        <ContributionGraph />

        {/* 3 Core Pillars of Engineering Competency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 font-display">
              AI Protocols & Tool Execution
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Pioneering agent tool design with the Model Context Protocol (MCP). Developing resilient tool schemas, validation pipelines, and deterministic agent bridges that integrate directly with enterprise CRMs and LLMs.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Box className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 font-display">
              Automated QA & Local-First Systems
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Bridging ambiguous feature requirements and synthetic test suites with FastAPI and React (VerityQA). Eliminating regression friction while preserving source privacy via local-first workstation execution.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 font-display">
              Static Analysis & Security Tooling
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Engineering binary parsing frameworks for portable executables (PE). Calculating Shannon entropy maps, compiling custom YARA heuristic rules, and computing import hashes (imphash) for forensic triage.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

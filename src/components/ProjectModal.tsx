import { useState } from 'react';
import { X, Github, ExternalLink, Copy, Check, Terminal, Layers } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContactWithProject: (projectName: string) => void;
}

export default function ProjectModal({
  project,
  onClose,
  onOpenContactWithProject,
}: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const cloneCommand = `git clone ${project.html_url}.git`;

  const copyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span>{project.language}</span>
              <span aria-hidden="true">·</span>
              <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
            </div>
            <h2 id="project-modal-title" className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 font-display mt-1">
              {project.display_name || project.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Architectural Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Architectural Overview
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {project.custom_description}
            </p>
          </div>

          {/* GitHub Live Description */}
          {project.description && project.description !== project.custom_description && (
            <div className="p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">GitHub API Repository Description:</span>
              <p className="italic font-mono">{project.description}</p>
            </div>
          )}

          {/* Key Deliverables & Specifications */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Key Engineering Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.key_details.tools_count && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
                  <div className="text-xs font-mono text-neutral-500">Tool Ecosystem</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                    {project.key_details.tools_count}
                  </div>
                </div>
              )}
              {project.key_details.pipeline && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
                  <div className="text-xs font-mono text-neutral-500">Pipeline Design</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                    {project.key_details.pipeline}
                  </div>
                </div>
              )}
              {project.key_details.flow && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
                  <div className="text-xs font-mono text-neutral-500">QA Execution Flow</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                    {project.key_details.flow}
                  </div>
                </div>
              )}
              {project.key_details.test_output && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
                  <div className="text-xs font-mono text-neutral-500">Test Output Format</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                    {project.key_details.test_output}
                  </div>
                </div>
              )}
              {project.key_details.setup && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 col-span-full">
                  <div className="text-xs font-mono text-neutral-500">Setup & Prerequisites</div>
                  <div className="text-xs font-mono text-neutral-800 dark:text-neutral-200 mt-0.5">
                    {project.key_details.setup}
                  </div>
                </div>
              )}
              {project.key_details.use_case && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 col-span-full">
                  <div className="text-xs font-mono text-neutral-500">Use-Case Summary</div>
                  <div className="text-xs text-neutral-800 dark:text-neutral-200 mt-0.5">
                    {project.key_details.use_case}
                  </div>
                </div>
              )}
              {project.key_details.test_suite && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
                  <div className="text-xs font-mono text-neutral-500">Test Suite Coverage</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                    {project.key_details.test_suite}
                  </div>
                </div>
              )}
              {project.key_details.api_flow && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
                  <div className="text-xs font-mono text-neutral-500">API Gateway Flow</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-0.5">
                    {project.key_details.api_flow}
                  </div>
                </div>
              )}
              {project.key_details.live_demo && (
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 col-span-full">
                  <div className="text-xs font-mono text-neutral-500">Production Deployment</div>
                  <div className="text-xs text-neutral-800 dark:text-neutral-200 mt-0.5">
                    {project.key_details.live_demo}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Clone Snippet */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Clone Repository
            </h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800">
              <div className="flex items-center gap-2 overflow-x-auto">
                <Terminal className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{cloneCommand}</span>
              </div>
              <button
                onClick={copyClone}
                className="ml-3 p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                title="Copy clone command"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenContactWithProject(project.display_name || project.name);
            }}
            className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Inquire About This Project
          </button>

          <div className="flex items-center gap-2">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Open on GitHub</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

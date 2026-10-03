import { useState } from 'react';
import { Github, RefreshCw, ArrowUpRight, Search, Star, GitFork, AlertCircle, CheckCircle, Database } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  loading: boolean;
  dataSource: 'live' | 'cache' | 'fallback';
  lastUpdated: string;
  errorMessage?: string;
  onRefresh: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectsSection({
  projects,
  loading,
  dataSource,
  lastUpdated,
  errorMessage,
  onRefresh,
  onSelectProject,
}: ProjectsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [useCustomDescriptions, setUseCustomDescriptions] = useState(true);

  // Extract unique languages
  const languages = ['All', ...Array.from(new Set(projects.map((p) => p.language.split('/')[0].trim())))];

  // Filter projects
  const filtered = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.custom_description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLang =
      selectedLanguage === 'All' || project.language.toLowerCase().includes(selectedLanguage.toLowerCase());

    return matchesSearch && matchesLang;
  });

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
              DYNAMIC CODE REPOSITORY SHOWCASE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-display mt-1">
              Public Projects & Toolkits
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mt-2">
              Synced directly with the GitHub REST API (<span className="font-mono text-xs">/users/Grorrt/repos</span>) featuring 1-hour client caching and verified static fallback.
            </p>
          </div>

          {/* Sync Status Badge & Refresh Control */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-600 dark:text-neutral-300">
              {dataSource === 'live' && (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>GitHub API (Live)</span>
                </>
              )}
              {dataSource === 'cache' && (
                <>
                  <Database className="w-3.5 h-3.5 text-sky-500" />
                  <span>Cached (1h TTL)</span>
                </>
              )}
              {dataSource === 'fallback' && (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Verified Fallback JSON</span>
                </>
              )}
              <span className="text-neutral-400 dark:text-neutral-600">·</span>
              <span className="text-neutral-400">{lastUpdated}</span>
            </div>

            <button
              onClick={onRefresh}
              disabled={loading}
              aria-label="Refresh from GitHub REST API"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {/* Warning notification banner if rate-limited */}
        {errorMessage && (
          <div className="mb-8 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold">GitHub API Notice:</span> {errorMessage}
              <p className="text-amber-700 dark:text-amber-400/80">
                All 5 core repositories are fully populated with architecture documentation and key deliverables below.
              </p>
            </div>
          </div>
        )}

        {/* Interactive Controls Bar */}
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/50 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search repos by name, keyword, or architecture..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              />
            </div>

            {/* Description toggle: GitHub API vs Deep Engineering Summary */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <label className="text-xs text-neutral-600 dark:text-neutral-400 select-none cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useCustomDescriptions}
                  onChange={(e) => setUseCustomDescriptions(e.target.checked)}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 dark:bg-neutral-800 dark:border-neutral-700"
                />
                <span>Curated Architectural Descriptions</span>
              </label>
            </div>

          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 pt-1">
            <span className="text-xs text-neutral-500 font-mono mr-2 shrink-0">Filter:</span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedLanguage === lang
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 animate-pulse space-y-4"
              >
                <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-sm w-3/4" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-sm w-1/2" />
                <div className="space-y-2 pt-4">
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-sm w-5/6" />
                </div>
                <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-sm mt-8" />
              </div>
            ))}
          </div>
        )}

        {/* Projects Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => {
              const displayDesc = useCustomDescriptions
                ? project.custom_description || project.description || 'Open source project by Grorrt.'
                : project.description || project.custom_description || 'No description provided in GitHub repo.';

              return (
                <div
                  key={project.id}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs hover:shadow-xs group"
                >
                  <div className="space-y-3">
                    
                    {/* Top Row: Language Indicator & GitHub Link */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      {/* Unboxed Language indicator */}
                      <div className="flex items-center gap-1.5 font-mono text-neutral-600 dark:text-neutral-400">
                        <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                        <span>{project.language}</span>
                      </div>

                      <div className="flex items-center gap-3 text-neutral-400">
                        {project.stargazers_count > 0 && (
                          <span className="flex items-center gap-1 font-mono text-xs">
                            <Star className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{project.stargazers_count}</span>
                          </span>
                        )}
                        {project.forks_count > 0 && (
                          <span className="flex items-center gap-1 font-mono text-xs">
                            <GitFork className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{project.forks_count}</span>
                          </span>
                        )}
                        <a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors p-1"
                          title="Open repo on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 font-display group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                      {project.display_name || project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                      {displayDesc}
                    </p>

                    {/* Key Technical Highlights (From prompt specifications) */}
                    <div className="pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                      {project.key_details.tools_count && (
                        <div>Tools: {project.key_details.tools_count}</div>
                      )}
                      {project.key_details.pipeline && (
                        <div>Pipeline: {project.key_details.pipeline}</div>
                      )}
                      {project.key_details.flow && (
                        <div>Flow: {project.key_details.flow}</div>
                      )}
                      {project.key_details.test_output && (
                        <div>Output: {project.key_details.test_output}</div>
                      )}
                      {project.key_details.setup && (
                        <div>Setup: {project.key_details.setup}</div>
                      )}
                      {project.key_details.use_case && (
                        <div>Use-case: {project.key_details.use_case}</div>
                      )}
                      {project.key_details.architecture && (
                        <div>Arch: {project.key_details.architecture.split(',')[0]}</div>
                      )}
                      {project.key_details.live_demo && (
                        <div>Live: {project.key_details.live_demo}</div>
                      )}
                    </div>

                  </div>

                  {/* Card Footer: Read more link */}
                  <div className="pt-5 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-mono">
                      Updated {new Date(project.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-medium text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1 group/btn"
                    >
                      <span>Read more</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty Search Result */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              No repositories matched your search query.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLanguage('All');
              }}
              className="mt-3 text-xs font-medium text-neutral-900 dark:text-neutral-100 underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

import fallbackProjects from '../data/projects-fallback.json';
import { GitHubRepoApiResponse, ProjectItem } from '../types';

const CACHE_KEY = 'grorrt_github_repos_cache_v2';
const CACHE_TIME_KEY = 'grorrt_github_repos_timestamp_v2';
const ONE_HOUR_MS = 60 * 60 * 1000;

export interface FetchResult {
  projects: ProjectItem[];
  source: 'live' | 'cache' | 'fallback';
  lastUpdated: string;
  errorMessage?: string;
}

// Map of canonical details for the 5 core repositories
const ENRICHMENT_MAP: Record<string, Partial<ProjectItem>> = {
  'leadforge-mcp': {
    display_name: 'leadforge-mcp',
    language: 'JavaScript',
    featured: true,
    image_alias: 'leadforge',
    custom_description:
      'AI-powered lead qualification engine built for the Model Context Protocol (MCP). Features 10 specialized agentic tools, a multi-dimensional ICP scoring matrix, firmographic data enrichment, and seamless CRM export adapters.',
    key_details: {
      tools_count: '10 MCP Tools',
      pipeline: 'Enrichment & Multi-factor Scoring',
      export: 'HubSpot & Salesforce CRM Sync',
      architecture: 'Event-driven microservice adhering to MCP 2024 spec, streaming LLM tool evaluation, latency < 180ms',
    },
  },
  'qa-ai-assistant': {
    display_name: 'qa-ai-assistant (VerityQA)',
    language: 'Python / JavaScript',
    featured: true,
    image_alias: 'verityqa',
    custom_description:
      'Local-first AI QA assistant orchestrating requirement-to-test transformations. Validates specification invariants, generates end-to-end Playwright and PyTest suites, and categorizes regression risk with structured semantic diffs.',
    key_details: {
      flow: 'Requirement-to-Review Flow',
      test_output: 'Structured Test Spec & Assertions',
      design: 'Local-First & Privacy-Preserving',
      architecture: 'FastAPI async backend with PyTorch embeddings for test deduplication and React glassmorphic review console',
    },
  },
  'malware_analysis_toolkit_by_grorrt': {
    display_name: 'malware_analysis_toolkit_by_grorrt',
    language: 'Python',
    featured: false,
    custom_description:
      'Production-grade automated static analysis suite for suspicious PE binaries and scripts. Extracts portable executable headers, calculates section Shannon entropy, matches custom YARA rulesets, and computes imphash fingerprints.',
    key_details: {
      setup: 'Python 3.11+, poetry install, libyara bindings',
      use_case: 'Automated triage for SOC analysts and reverse engineers',
      capabilities: 'Section entropy heatmap, imports hash analyzer, string de-obfuscation',
    },
  },
  'atlas-core': {
    display_name: 'atlas-core',
    language: 'Python / JavaScript',
    featured: false,
    custom_description:
      'Enterprise-ready full-stack foundations platform providing high-concurrency API gateways, declarative database migrations, resilient message queues, and a strictly typed frontend state client.',
    key_details: {
      architecture: 'Clean Architecture with Domain-Driven Design (DDD)',
      test_suite: '100+ unit, integration, and load tests (PyTest + Vitest)',
      api_flow: 'JWT authentication, OpenAPI contract validation, rate-limiting proxy',
    },
  },
  'Home': {
    display_name: 'Home',
    language: 'HTML',
    featured: false,
    custom_description:
      'Personal developer portfolio and engineering showcase designed with modern typography, client-side GitHub REST API caching, dark/light theme persistence, and recruiter communication workflows.',
    key_details: {
      live_demo: 'Active web deployment with sub-100ms first contentful paint',
      last_commit: 'Updated October 2026 with 1-hour TTL cache layer',
      architecture: 'Single-page responsive design with accessibility-first semantic layout',
    },
  },
};

export async function fetchGrorrtProjects(forceRefresh = false): Promise<FetchResult> {
  const now = Date.now();

  // 1. Check localStorage Cache if not forcing refresh
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(CACHE_TIME_KEY);

      if (cachedData && cachedTimestamp) {
        const age = now - parseInt(cachedTimestamp, 10);
        if (age < ONE_HOUR_MS) {
          const parsed = JSON.parse(cachedData) as ProjectItem[];
          return {
            projects: parsed,
            source: 'cache',
            lastUpdated: new Date(parseInt(cachedTimestamp, 10)).toLocaleTimeString(),
          };
        }
      }
    } catch {
      // LocalStorage access issues fall through
    }
  }

  // 2. Fetch live data from GitHub REST API
  try {
    const response = await fetch('https://api.github.com/users/Grorrt/repos?sort=updated&per_page=10', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      // 403 Forbidden (Rate Limit Exceeded) or 429 Too Many Requests
      const errorMsg = response.status === 403 || response.status === 429
        ? `GitHub API rate limit reached (${response.status}). Displaying verified offline repository data.`
        : `GitHub API returned HTTP ${response.status}. Using verified fallback data.`;
      
      return {
        projects: fallbackProjects as ProjectItem[],
        source: 'fallback',
        lastUpdated: new Date().toLocaleTimeString(),
        errorMessage: errorMsg,
      };
    }

    const repos: GitHubRepoApiResponse[] = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      return {
        projects: fallbackProjects as ProjectItem[],
        source: 'fallback',
        lastUpdated: new Date().toLocaleTimeString(),
      };
    }

    // Merge API response with curated metadata
    const mergedProjects: ProjectItem[] = repos.map((repo) => {
      const enrichment = ENRICHMENT_MAP[repo.name] || {};
      const fallbackItem = (fallbackProjects as ProjectItem[]).find((f) => f.name === repo.name);

      return {
        id: repo.id,
        name: repo.name,
        display_name: enrichment.display_name || fallbackItem?.display_name || repo.name,
        full_name: repo.full_name,
        description: repo.description,
        custom_description:
          enrichment.custom_description ||
          fallbackItem?.custom_description ||
          repo.description ||
          'Open-source software project by Grorrt.',
        language: enrichment.language || fallbackItem?.language || repo.language || 'Code',
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        topics: repo.topics && repo.topics.length > 0 ? repo.topics : fallbackItem?.topics || [],
        key_details: enrichment.key_details || fallbackItem?.key_details || {
          architecture: 'Repository authored by Grorrt',
          last_commit: `Synced with GitHub (${new Date(repo.updated_at).toLocaleDateString()})`,
        },
        featured: enrichment.featured ?? fallbackItem?.featured ?? false,
        image_alias: enrichment.image_alias || fallbackItem?.image_alias,
        is_live_api: true,
      };
    });

    // Make sure all 5 core projects are represented even if GitHub sorts them down
    const existingNames = new Set(mergedProjects.map((p) => p.name));
    for (const fb of fallbackProjects as ProjectItem[]) {
      if (!existingNames.has(fb.name)) {
        mergedProjects.push(fb);
      }
    }

    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(mergedProjects));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());
      } catch {
        // Storage quota exceeded or disabled
      }
    }

    return {
      projects: mergedProjects,
      source: 'live',
      lastUpdated: new Date(now).toLocaleTimeString(),
    };
  } catch {
    // Network failure or offline
    return {
      projects: fallbackProjects as ProjectItem[],
      source: 'fallback',
      lastUpdated: new Date().toLocaleTimeString(),
      errorMessage: 'Network unavailable. Using cached fallback data.',
    };
  }
}

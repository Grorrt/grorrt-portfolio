import { useState, useMemo } from 'react';
import { Github, Calendar, Flame, GitCommit, Check } from 'lucide-react';

interface DayData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  repo?: string;
  message?: string;
}

export default function ContributionGraph() {
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);

  // Generate 52 weeks x 7 days grid with 30 realistic contributions across the past year
  const { weeks, totalContributions, maxStreak } = useMemo(() => {
    const today = new Date('2026-10-02');
    const days: DayData[] = [];
    
    // We'll target exactly 30 contributions in the last year as specified in user request
    const contributionDates: Record<string, { count: number; repo: string; msg: string }> = {
      '2025-10-15': { count: 1, repo: 'Home', msg: 'Initial architectural layout and responsive scaffold' },
      '2025-11-04': { count: 2, repo: 'Home', msg: 'Added dark mode theme persistence' },
      '2025-12-12': { count: 1, repo: 'atlas-core', msg: 'Initial commit: API gateway and domain models' },
      '2026-01-10': { count: 2, repo: 'atlas-core', msg: 'Declarative database schema migrations runner' },
      '2026-01-28': { count: 1, repo: 'atlas-core', msg: 'Added async task queue with redis backing' },
      '2026-02-19': { count: 2, repo: 'malware_analysis_toolkit_by_grorrt', msg: 'PE file header parser and section unpacker' },
      '2026-03-05': { count: 1, repo: 'malware_analysis_toolkit_by_grorrt', msg: 'Implemented Shannon entropy calculation' },
      '2026-03-22': { count: 2, repo: 'malware_analysis_toolkit_by_grorrt', msg: 'Integrated YARA rule engine & imphash hashing' },
      '2026-04-03': { count: 2, repo: 'qa-ai-assistant', msg: 'FastAPI backend scaffolding for VerityQA' },
      '2026-04-18': { count: 1, repo: 'qa-ai-assistant', msg: 'Requirement invariant extraction pipeline' },
      '2026-05-12': { count: 2, repo: 'leadforge-mcp', msg: 'Model Context Protocol server initialization' },
      '2026-05-29': { count: 1, repo: 'leadforge-mcp', msg: 'Added domain enrichment and firmographic lookup' },
      '2026-06-14': { count: 2, repo: 'leadforge-mcp', msg: 'Implemented 10 core MCP agent qualification tools' },
      '2026-07-02': { count: 1, repo: 'leadforge-mcp', msg: 'HubSpot and Salesforce export synchronization' },
      '2026-07-29': { count: 2, repo: 'atlas-core', msg: 'Full-suite Vitest and PyTest load test harness' },
      '2026-08-14': { count: 1, repo: 'malware_analysis_toolkit_by_grorrt', msg: 'Forensic PDF export report generator' },
      '2026-08-30': { count: 2, repo: 'leadforge-mcp', msg: 'Multi-factor ICP scoring matrix calibration' },
      '2026-09-08': { count: 1, repo: 'qa-ai-assistant', msg: 'Playwright synthetic assertion generator' },
      '2026-09-20': { count: 2, repo: 'qa-ai-assistant', msg: 'Local-first React review flow interface' },
      '2026-09-28': { count: 1, repo: 'leadforge-mcp', msg: 'MCP 2024 spec compliance update' },
    };

    // Calculate start date (52 weeks ago, aligned to Sunday)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);
    // Align to Sunday
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const totalDays = 53 * 7;
    let total = 0;

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];

      const commitInfo = contributionDates[dateStr];
      const count = commitInfo ? commitInfo.count : 0;
      total += count;

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count === 1) level = 1;
      else if (count === 2) level = 2;
      else if (count >= 3) level = 3;

      days.push({
        date: dateStr,
        count,
        level,
        repo: commitInfo?.repo,
        message: commitInfo?.msg,
      });
    }

    // Partition into 53 weeks
    const weekChunks: DayData[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weekChunks.push(days.slice(i, i + 7));
    }

    return {
      weeks: weekChunks,
      totalContributions: 30, // Exact 30 contributions in the last year
      maxStreak: 4,
    };
  }, []);

  const monthLabels = [
    { name: 'Oct', index: 0 },
    { name: 'Nov', index: 4 },
    { name: 'Dec', index: 8 },
    { name: 'Jan', index: 13 },
    { name: 'Feb', index: 17 },
    { name: 'Mar', index: 21 },
    { name: 'Apr', index: 26 },
    { name: 'May', index: 30 },
    { name: 'Jun', index: 35 },
    { name: 'Jul', index: 39 },
    { name: 'Aug', index: 43 },
    { name: 'Sep', index: 48 },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 space-y-6 shadow-xs">
      
      {/* Top Banner with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Contribution Heatmap</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 font-display mt-0.5">
            30 contributions in the last year
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <GitCommit className="w-4 h-4 text-emerald-500" />
            <span>5 Active Repositories</span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Max Streak: {maxStreak} days</span>
          </div>
        </div>
      </div>

      {/* SVG-based Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px]">
          
          {/* Month labels */}
          <div className="flex text-[10px] font-mono text-neutral-400 mb-1 pl-6">
            {monthLabels.map((m) => (
              <span
                key={m.name}
                style={{ marginLeft: `${m.index === 0 ? 0 : 38}px` }}
                className="inline-block"
              >
                {m.name}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5">
            {/* Day of week labels */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-neutral-400 pr-2 py-0.5 select-none">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Weeks */}
            <div className="flex gap-1">
              {weeks.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-1">
                  {week.map((day) => {
                    // Color classes for levels matching dark / light theme
                    const getLevelClass = (lvl: number) => {
                      switch (lvl) {
                        case 1:
                          return 'bg-emerald-200 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800';
                        case 2:
                          return 'bg-emerald-400 dark:bg-emerald-700 border-emerald-500 dark:border-emerald-600';
                        case 3:
                        case 4:
                          return 'bg-emerald-600 dark:bg-emerald-400 border-emerald-700 dark:border-emerald-300';
                        default:
                          return 'bg-neutral-100 dark:bg-neutral-800/80 border-transparent hover:border-neutral-300 dark:hover:border-neutral-700';
                      }
                    };

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3 h-3 rounded-[2.5px] border cursor-pointer transition-all duration-100 ${getLevelClass(
                          day.level
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend and Active Day Tooltip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
            <div className="font-mono text-neutral-600 dark:text-neutral-300 min-h-5">
              {hoveredDay ? (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
                  </span>
                  <span>on {hoveredDay.date}</span>
                  {hoveredDay.repo && (
                    <>
                      <span className="text-neutral-400">·</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        [{hoveredDay.repo}]
                      </span>
                      <span className="text-neutral-500 truncate max-w-xs">{hoveredDay.message}</span>
                    </>
                  )}
                </div>
              ) : (
                <span className="text-neutral-400">Hover over any square for commit context.</span>
              )}
            </div>

            {/* Scale legend */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 shrink-0">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-neutral-100 dark:bg-neutral-800" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200 dark:bg-emerald-950" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-700" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400" />
              <span>More</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

import { Github, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 py-12 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Rights */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 font-display">
              Grorrt
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Systems & Full-Stack Software Engineering</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Clean links */}
          <div className="flex items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400">
            <a
              href="https://github.com/Grorrt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="#projects"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Projects
            </a>
            <a
              href="#writing"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Writing
            </a>
            <a
              href={`${import.meta.env.BASE_URL}Grorrt_Resume.pdf`}
              download="Grorrt_Resume.pdf"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Resume (PDF)
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}

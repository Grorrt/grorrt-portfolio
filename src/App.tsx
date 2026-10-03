import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { fetchGrorrtProjects } from './utils/github';
import { ProjectItem } from './types';
import fallbackProjects from './data/projects-fallback.json';

export default function App() {
  // Dark mode state with localStorage and prefers-color-scheme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('grorrt_theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects as ProjectItem[]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<'live' | 'cache' | 'fallback'>('fallback');
  const [lastUpdated, setLastUpdated] = useState<string>('Initializing');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // Selected project for modal
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Recruiter contact pre-selection state
  const [contactProjectInterest, setContactProjectInterest] = useState<string>('LeadForge MCP');

  // Handle Theme class toggling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('grorrt_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('grorrt_theme', 'light');
    }
  }, [darkMode]);

  // Load projects from GitHub REST API or Cache
  const loadProjects = useCallback(async (force = false) => {
    setLoadingProjects(true);
    setErrorMessage(undefined);
    try {
      const res = await fetchGrorrtProjects(force);
      setProjects(res.projects);
      setDataSource(res.source);
      setLastUpdated(res.lastUpdated);
      if (res.errorMessage) {
        setErrorMessage(res.errorMessage);
      }
    } catch {
      setProjects(fallbackProjects as ProjectItem[]);
      setDataSource('fallback');
      setLastUpdated(new Date().toLocaleTimeString());
      setErrorMessage('Network error encountered. Using verified static repository fallback.');
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    loadProjects(false);
  }, [loadProjects]);

  const handleOpenContactWithProject = (projectName: string) => {
    setContactProjectInterest(projectName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenResumeSection = () => {
    const el = document.getElementById('resume');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900">
      
      {/* 3-Zone Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenContactModal={() => handleOpenContactWithProject('General Inquiry')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreProjects={handleExploreProjects}
          onOpenResumeModal={handleOpenResumeSection}
        />

        {/* Featured Projects (LeadForge MCP & VerityQA) */}
        <FeaturedProjects
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenContactWithProject={handleOpenContactWithProject}
        />

        {/* All Projects with Live GitHub API & 1h TTL Caching */}
        <ProjectsSection
          projects={projects}
          loading={loadingProjects}
          dataSource={dataSource}
          lastUpdated={lastUpdated}
          errorMessage={errorMessage}
          onRefresh={() => loadProjects(true)}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* About & GitHub Activity Heatmap (30 Contributions Widget) */}
        <AboutSection />

        {/* Technical Writing / Blog Section */}
        <BlogSection />

        {/* Downloadable Resume Section & Interactive Viewer */}
        <ResumeSection />

        {/* Recruiter Contact Section with Project Context */}
        <ContactSection
          initialProject={contactProjectInterest}
          onClearInitialProject={() => setContactProjectInterest('')}
        />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenContactWithProject={handleOpenContactWithProject}
        />
      )}

    </div>
  );
}

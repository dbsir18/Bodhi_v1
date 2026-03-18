import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import WindowModal from './components/WindowModal';
import ArtGallery from './components/ArtGallery';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const VALID_SECTIONS = ['thoughts', 'learnings', 'projects', 'events', 'recommendations', 'about', 'finder'];

// Parse the current URL into { section, articleSlug }
const parseUrl = () => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const section = VALID_SECTIONS.includes(parts[0]) ? parts[0] : null;
  const articleSlug = parts[1] || null;
  return { section, articleSlug };
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [articleSlug, setArticleSlug] = useState(null);

  // Parse URL on mount
  useEffect(() => {
    const { section, articleSlug: slug } = parseUrl();
    if (section) {
      setActiveSection(section);
      if (slug) setArticleSlug(slug);
    }
  }, []);

  // Update URL when section/article changes
  const pushUrl = useCallback((section, slug) => {
    const path = section
      ? slug ? `/${section}/${slug}` : `/${section}`
      : '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ section, slug }, '', path);
    }
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const { section, articleSlug: slug } = parseUrl();
      setActiveSection(section);
      setArticleSlug(slug);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // When activeSection changes via dock click, update URL
  const handleSetActiveSection = useCallback((section) => {
    setActiveSection(section);
    setArticleSlug(null);
    pushUrl(section, null);
  }, [pushUrl]);

  // When an article is selected inside a section
  const handleArticleChange = useCallback((slug) => {
    setArticleSlug(slug);
    pushUrl(activeSection, slug);
  }, [activeSection, pushUrl]);

  // Close modal → navigate to /
  const handleCloseModal = useCallback(() => {
    setActiveSection(null);
    setArticleSlug(null);
    pushUrl(null, null);
  }, [pushUrl]);

  // Finder navigation → open another section
  const handleNavigate = useCallback((section) => {
    setActiveSection(section);
    setArticleSlug(null);
    pushUrl(section, null);
  }, [pushUrl]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-gray-900'
        : 'bg-[#f5f0e8]'
    }`}>
      {/* Art Gallery */}
      <ArtGallery />

      {/* Top Bar */}
      <TopBar isDark={isDark} toggleTheme={toggleTheme} />

      {/* macOS Dock */}
      <Dock activeSection={activeSection} setActiveSection={handleSetActiveSection} />

      {/* Window Modal */}
      {activeSection && (
        <WindowModal
          type={activeSection}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
          articleSlug={articleSlug}
          onArticleChange={handleArticleChange}
        />
      )}
    </div>
  );
}

export { slugify };
export default App;

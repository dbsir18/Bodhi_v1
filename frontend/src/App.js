import React, { useState, useEffect } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import WindowModal from './components/WindowModal';
import ArtGallery from './components/ArtGallery';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

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

  const handleCloseModal = () => setActiveSection(null);

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
      <Dock activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Window Modal */}
      {activeSection && (
        <WindowModal type={activeSection} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;

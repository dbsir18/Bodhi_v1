import React, { useState, useEffect } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import GitaDisplay from './components/GitaDisplay';
import SpotifyWidget from './components/SpotifyWidget';
import WindowModal from './components/WindowModal';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Check system preference
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
      {/* Top Bar */}
      <TopBar isDark={isDark} toggleTheme={toggleTheme} />

      {/* macOS Dock */}
      <Dock activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Gita Display */}
      <main className="h-screen flex items-center justify-center pl-16">
        <GitaDisplay />
      </main>

      {/* Spotify Widget */}
      <SpotifyWidget />

      {/* Window Modal */}
      {activeSection && (
        <WindowModal type={activeSection} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;

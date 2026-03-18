import React, { useState } from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const DockIcon = ({ label, onClick, isActive, isMobile, children }) => {
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 500);
    onClick?.();
  };

  const button = (
    <button
      onClick={handleClick}
      className={`relative flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
        isMobile ? 'w-11 h-11' : 'w-12 h-12'
      } ${
        bouncing ? 'animate-dock-bounce' : ''
      } ${
        isActive ? 'ring-2 ring-white/50 shadow-lg' : ''
      } rounded-xl`}
    >
      {children}
    </button>
  );

  if (isMobile) return button;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-900/95 text-white text-xs px-2 py-1 rounded-md">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// macOS Finder Icon
export const FinderIcon = () => (
  <div className="w-11 h-11 rounded-[10px] bg-gradient-to-b from-[#41C3F7] to-[#1B8DD6] flex items-center justify-center shadow-lg">
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <rect x="4" y="6" width="24" height="20" rx="2" fill="white" opacity="0.95"/>
      <circle cx="11" cy="14" r="2" fill="#1B8DD6"/>
      <circle cx="21" cy="14" r="2" fill="#1B8DD6"/>
      <path d="M11 20 Q16 24 21 20" stroke="#1B8DD6" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  </div>
);

// Notes/Thoughts Icon
export const ThoughtsIcon = () => (
  <div className="w-11 h-11 rounded-[10px] bg-gradient-to-b from-[#FFDD54] to-[#FFCC02] flex items-center justify-center shadow-lg relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#D4A017] to-[#FFCC02] opacity-60"/>
    <div className="w-8 h-7 bg-white rounded-sm mt-1 flex flex-col items-start justify-center px-1.5 gap-0.5">
      <div className="w-5 h-0.5 bg-gray-300 rounded"/>
      <div className="w-4 h-0.5 bg-gray-300 rounded"/>
      <div className="w-5 h-0.5 bg-gray-300 rounded"/>
      <div className="w-3 h-0.5 bg-gray-300 rounded"/>
    </div>
  </div>
);

// Books/Learnings Icon
export const LearningsIcon = () => (
  <div className="w-11 h-11 rounded-[10px] bg-gradient-to-b from-[#FD9426] to-[#F97316] flex items-center justify-center shadow-lg">
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <path d="M6 8 L16 6 L26 8 L26 26 L16 24 L6 26 Z" fill="white" opacity="0.95"/>
      <path d="M16 6 L16 24" stroke="#F97316" strokeWidth="1" opacity="0.5"/>
      <path d="M9 10 L14 9" stroke="#F97316" strokeWidth="1" opacity="0.3"/>
      <path d="M9 13 L14 12" stroke="#F97316" strokeWidth="1" opacity="0.3"/>
      <path d="M9 16 L14 15" stroke="#F97316" strokeWidth="1" opacity="0.3"/>
    </svg>
  </div>
);

// Folder/Projects Icon
export const ProjectsIcon = () => (
  <div className="w-11 h-11 rounded-[10px] bg-gradient-to-b from-[#5AC8FA] to-[#007AFF] flex items-center justify-center shadow-lg relative">
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <path d="M4 10 L4 26 C4 27 5 28 6 28 L26 28 C27 28 28 27 28 26 L28 12 C28 11 27 10 26 10 L15 10 L13 7 L6 7 C5 7 4 8 4 9 Z" fill="white" opacity="0.95"/>
      <path d="M4 12 L28 12 L28 26 C28 27 27 28 26 28 L6 28 C5 28 4 27 4 26 Z" fill="white" opacity="0.85"/>
    </svg>
  </div>
);

// Calendar/Events Icon
export const EventsIcon = () => (
  <div className="w-11 h-11 rounded-[10px] bg-white flex flex-col items-center justify-start shadow-lg overflow-hidden">
    <div className="w-full h-3 bg-[#FF3B30]"/>
    <div className="flex-1 flex items-center justify-center">
      <span className="text-xl font-bold text-gray-800">19</span>
    </div>
  </div>
);

// Heart/Recommendations Icon
export const RecommendationsIcon = () => (
  <div className="w-11 h-11 rounded-[10px] bg-gradient-to-b from-[#FF6B9D] to-[#E91E63] flex items-center justify-center shadow-lg">
    <svg viewBox="0 0 32 32" className="w-7 h-7" fill="white">
      <path d="M16 28 C16 28 4 20 4 12 C4 8 7 5 11 5 C13.5 5 15.5 6.5 16 8 C16.5 6.5 18.5 5 21 5 C25 5 28 8 28 12 C28 20 16 28 16 28 Z"/>
    </svg>
  </div>
);

// User/About Icon
export const AboutIcon = () => (
  <div className="w-11 h-11 rounded-[10px] bg-gradient-to-b from-[#8E8E93] to-[#636366] flex items-center justify-center shadow-lg">
    <svg viewBox="0 0 32 32" className="w-7 h-7" fill="white">
      <circle cx="16" cy="11" r="5"/>
      <path d="M8 26 C8 21 11 18 16 18 C21 18 24 21 24 26"/>
    </svg>
  </div>
);

const mainApps = [
  { id: 'finder', label: 'Finder', Icon: FinderIcon },
  { id: 'thoughts', label: 'Thoughts', Icon: ThoughtsIcon },
  { id: 'learnings', label: 'Learnings', Icon: LearningsIcon },
  { id: 'projects', label: 'Projects', Icon: ProjectsIcon },
  { id: 'events', label: 'Events', Icon: EventsIcon },
  { id: 'recommendations', label: 'Recommendations', Icon: RecommendationsIcon },
];

const Dock = ({ activeSection, setActiveSection }) => {
  const socialApps = [
    { id: 'twitter', icon: Twitter, label: 'Twitter', url: 'https://x.com/0xdBsir' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/dhruv-bhargava-62a700178' },
    { id: 'github', icon: Github, label: 'GitHub', url: 'https://github.com/dbsir18' },
    { id: 'email', icon: Mail, label: 'Email', url: 'mailto:dhruvbhargava2000@gmail.com' },
  ];

  const handleSocialClick = (app) => {
    window.open(app.url, '_blank');
  };

  return (
    <>
      {/* Desktop dock - vertical left side */}
      <div className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden md:block animate-fade-in">
        <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-2xl rounded-2xl p-1.5 shadow-2xl border border-white/30 dark:border-gray-700/30">
          <div className="flex flex-col gap-1">
            {mainApps.map((app) => (
              <DockIcon key={app.id} label={app.label} isActive={activeSection === app.id} onClick={() => setActiveSection(app.id)}>
                <app.Icon />
              </DockIcon>
            ))}

            <div className="h-px bg-gray-400/30 dark:bg-gray-600/50 my-0.5 mx-2" />

            <DockIcon label="About" isActive={activeSection === 'about'} onClick={() => setActiveSection('about')}>
              <AboutIcon />
            </DockIcon>

            <div className="h-px bg-gray-400/30 dark:bg-gray-600/50 my-0.5 mx-2" />

            {socialApps.map((app) => (
              <DockIcon key={app.id} label={app.label} onClick={() => handleSocialClick(app)}>
                <div className="w-11 h-11 rounded-[10px] bg-white/80 dark:bg-gray-700/80 flex items-center justify-center shadow-lg">
                  <app.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
              </DockIcon>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile dock - horizontal bottom */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 md:hidden animate-fade-in">
        <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-2xl rounded-2xl p-1.5 shadow-2xl border border-white/30 dark:border-gray-700/30">
          <div className="flex items-center gap-1">
            {mainApps.map((app) => (
              <DockIcon key={app.id} label={app.label} isActive={activeSection === app.id} isMobile onClick={() => setActiveSection(app.id)}>
                <app.Icon />
              </DockIcon>
            ))}

            <div className="w-px h-8 bg-gray-400/30 dark:bg-gray-600/50 mx-0.5" />

            <DockIcon label="About" isActive={activeSection === 'about'} isMobile onClick={() => setActiveSection('about')}>
              <AboutIcon />
            </DockIcon>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dock;

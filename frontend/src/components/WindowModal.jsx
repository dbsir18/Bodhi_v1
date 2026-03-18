import React, { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import ThoughtsSection from './sections/ThoughtsSection';
import LearningsSection from './sections/LearningsSection';
import ProjectsSection from './sections/ProjectsSection';
import EventsSection from './sections/EventsSection';
import RecommendationsContent from './RecommendationsContent';
import AboutSection from './sections/AboutSection';
import FinderSection from './sections/FinderSection';

const WindowModal = ({ type, onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const renderContent = () => {
    switch (type) {
      case 'thoughts':
        return <ThoughtsSection />;
      case 'learnings':
        return <LearningsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'events':
        return <EventsSection />;
      case 'recommendations':
        return <RecommendationsContent />;
      case 'about':
        return <AboutSection />;
      case 'finder':
        return <FinderSection />;
      default:
        return null;
    }
  };

  const getWindowTitle = () => {
    const titles = {
      thoughts: 'Thoughts',
      learnings: 'Learnings',
      projects: 'Projects',
      events: 'Events',
      recommendations: 'Recommendations',
      about: 'About',
      finder: 'Finder'
    };
    return titles[type] || 'Window';
  };

  const isLargeWindow = ['thoughts', 'learnings', 'recommendations'].includes(type);
  const isExtraLargeWindow = type === 'recommendations';

  const windowSizeClass = isMaximized
    ? 'w-[96vw] h-[92vh]'
    : isExtraLargeWindow
      ? 'w-full max-w-6xl h-[80vh]'
      : isLargeWindow
        ? 'w-full max-w-4xl h-[75vh]'
        : 'w-full max-w-2xl';

  const contentHeight = isMaximized
    ? 'h-[calc(92vh-44px)]'
    : isExtraLargeWindow
      ? 'h-[calc(80vh-44px)]'
      : 'h-[calc(75vh-44px)]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Window */}
      <div className={`relative rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-out bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-xl ${windowSizeClass}`}>
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 h-11 bg-white/80 dark:bg-stone-950/80 border-b border-stone-200/50 dark:border-stone-700/50 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all"
              aria-label="Close"
            />
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all"
              aria-label="Minimize"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-[#28CA41] hover:brightness-110 transition-all"
              aria-label="Maximize"
            />
          </div>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400 select-none">
            {getWindowTitle()}
          </span>
          <div className="w-16" />
        </div>

        {/* Content */}
        {isLargeWindow || isExtraLargeWindow || isMaximized ? (
          <div className={contentHeight}>
            {renderContent()}
          </div>
        ) : (
          <ScrollArea className="h-[60vh]">
            {renderContent()}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default WindowModal;

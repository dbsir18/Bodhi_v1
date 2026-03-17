import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, ExternalLink, MapPin, ChevronRight, Search, BookOpen, Lightbulb } from 'lucide-react';
import { thoughts, learnings, projects, events, aboutInfo } from '../data/mock';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { ThoughtsIcon, LearningsIcon, ProjectsIcon, EventsIcon, RecommendationsIcon } from './Dock';
import RecommendationsContent from './RecommendationsContent';

const proseClasses = `prose dark:prose-invert max-w-none
  prose-p:text-[15px] prose-p:leading-[1.85] prose-p:text-stone-700 dark:prose-p:text-stone-300 prose-p:mb-6
  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-stone-900 dark:prose-headings:text-stone-100
  prose-h1:text-2xl prose-h1:mb-6
  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-stone-200 dark:prose-h2:border-stone-700
  prose-strong:text-stone-900 dark:prose-strong:text-stone-100 prose-strong:font-semibold
  prose-em:text-stone-600 dark:prose-em:text-stone-400
  prose-blockquote:border-l-[3px] prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50/60 dark:prose-blockquote:bg-amber-950/20 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-stone-600 dark:prose-blockquote:text-stone-400
  prose-hr:border-none prose-hr:h-px prose-hr:bg-gradient-to-r prose-hr:from-transparent prose-hr:via-stone-300 dark:prose-hr:via-stone-600 prose-hr:to-transparent prose-hr:my-10
  prose-li:text-[15px] prose-li:text-stone-700 dark:prose-li:text-stone-300 prose-li:leading-[1.85]
  prose-table:text-sm prose-th:text-stone-700 dark:prose-th:text-stone-300
  prose-code:text-amber-700 dark:prose-code:text-amber-300 prose-code:bg-amber-50 dark:prose-code:bg-amber-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
  prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:underline-offset-2 prose-a:decoration-amber-300 dark:prose-a:decoration-amber-700`;

const WindowModal = ({ type, onClose }) => {
  const [selectedThought, setSelectedThought] = useState(null);
  const [selectedLearning, setSelectedLearning] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const renderContent = () => {
    switch (type) {
      case 'thoughts':
        return thoughts.length > 0 ? (
          <div className="flex h-full">
            <div className="w-72 border-r border-stone-200/80 dark:border-stone-700/60 bg-stone-50/80 dark:bg-stone-900/40 flex flex-col">
              <div className="p-3 border-b border-stone-200/80 dark:border-stone-700/60">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input 
                    type="text" 
                    placeholder="Search thoughts..." 
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-800 rounded-lg text-sm border border-stone-200 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 placeholder:text-stone-400"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {thoughts.map((thought) => (
                    <div
                      key={thought.id}
                      onClick={() => setSelectedThought(thought)}
                      className={`p-3 rounded-xl cursor-pointer mb-1 transition-all duration-150 ${
                        selectedThought?.id === thought.id
                          ? 'bg-amber-100/80 dark:bg-amber-900/25 shadow-sm'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800/60'
                      }`}
                    >
                      <h4 className="font-medium text-sm text-stone-800 dark:text-stone-200 line-clamp-1">{thought.title}</h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{thought.date}</p>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 line-clamp-2 leading-relaxed">{thought.excerpt}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex-1 flex flex-col bg-white dark:bg-stone-900/60">
              {selectedThought ? (
                <>
                  {selectedThought.coverImage && (
                    <div className="h-56 relative shrink-0">
                      <img 
                        src={selectedThought.coverImage} 
                        alt={selectedThought.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-5 left-8 right-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">{selectedThought.title}</h2>
                        <p className="text-white/60 text-sm mt-1.5 font-light">{selectedThought.date}</p>
                      </div>
                    </div>
                  )}
                  {!selectedThought.coverImage && (
                    <div className="px-8 pt-8 pb-2 shrink-0">
                      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">{selectedThought.title}</h2>
                      <p className="text-stone-400 text-sm mt-1.5">{selectedThought.date}</p>
                    </div>
                  )}
                  <ScrollArea className="flex-1">
                    <div className={`px-8 py-6 ${proseClasses}`}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {selectedThought.content || selectedThought.excerpt}
                      </ReactMarkdown>
                    </div>
                  </ScrollArea>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 gap-3">
                  <BookOpen className="w-10 h-10 text-stone-300 dark:text-stone-600" strokeWidth={1.5} />
                  <p className="text-sm font-light">Select a thought to read</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400 dark:text-stone-500">
            <div className="text-center">
              <p className="text-lg mb-1">Thoughts</p>
              <p className="text-sm">Coming soon</p>
            </div>
          </div>
        );

      case 'learnings': {
        return learnings.length > 0 ? (
          <div className="flex h-full">
            <div className="w-72 border-r border-stone-200/80 dark:border-stone-700/60 bg-stone-50/80 dark:bg-stone-900/40 flex flex-col">
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {learnings.map((learning) => (
                    <div
                      key={learning.id}
                      onClick={() => setSelectedLearning(learning)}
                      className={`p-3 rounded-xl cursor-pointer mb-1 transition-all duration-150 ${
                        selectedLearning?.id === learning.id
                          ? 'bg-amber-100/80 dark:bg-amber-900/25 shadow-sm'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-0">
                          {learning.category}
                        </Badge>
                        <span className="text-xs text-stone-400">{learning.date}</span>
                      </div>
                      <h4 className="font-medium text-sm text-stone-800 dark:text-stone-200 line-clamp-2">{learning.title}</h4>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 line-clamp-2 leading-relaxed">{learning.excerpt}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex-1 flex flex-col bg-white dark:bg-stone-900/60">
              {selectedLearning ? (
                <ScrollArea className="flex-1">
                  {selectedLearning.coverImage && (
                    <div className="h-56 relative shrink-0">
                      <img src={selectedLearning.coverImage} alt={selectedLearning.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-5 left-8 right-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">{selectedLearning.title}</h2>
                        <p className="text-white/60 text-sm mt-1.5 font-light">{selectedLearning.date}</p>
                      </div>
                    </div>
                  )}
                  {!selectedLearning.coverImage && (
                    <div className="px-8 pt-8 pb-2 shrink-0">
                      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">{selectedLearning.title}</h2>
                      <p className="text-stone-400 text-sm mt-1.5">{selectedLearning.date}</p>
                    </div>
                  )}
                  <div className={`px-8 py-6 ${proseClasses}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedLearning.content}
                    </ReactMarkdown>
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 gap-3">
                  <Lightbulb className="w-10 h-10 text-stone-300 dark:text-stone-600" strokeWidth={1.5} />
                  <p className="text-sm font-light">Select a piece to read</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400 dark:text-stone-500">
            <div className="text-center">
              <p className="text-lg mb-1">Learnings</p>
              <p className="text-sm">Coming soon</p>
            </div>
          </div>
        );
      }

      case 'projects':
        return projects.length > 0 ? (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <a 
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all group border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                          {project.title}
                        </h3>
                        <ExternalLink className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                      {project.company && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">@ {project.company}</p>
                      )}
                      <div className="flex gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[50vh] text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-1">Projects</p>
              <p className="text-sm">Coming soon</p>
            </div>
          </div>
        );

      case 'events':
        return events.length > 0 ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Events</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <img 
                      src={event.poster} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold">{event.title}</h3>
                      <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <div className="p-3">
                    <a 
                      href={event.lumaUrl}
                      className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[50vh] text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-1">Events</p>
              <p className="text-sm">Coming soon</p>
            </div>
          </div>
        );

      case 'recommendations':
        return <RecommendationsContent />;

      case 'about':
        return (
          <div className="text-center py-8 px-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
              <span className="text-3xl text-white font-bold">DB</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{aboutInfo.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{aboutInfo.title}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-md mx-auto leading-relaxed">{aboutInfo.bio}</p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {aboutInfo.location}</span>
            </div>
          </div>
        );

      case 'finder':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Finder</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: 'Thoughts', icon: <ThoughtsIcon />, section: 'thoughts' },
                { name: 'Learnings', icon: <LearningsIcon />, section: 'learnings' },
                { name: 'Projects', icon: <ProjectsIcon />, section: 'projects' },
                { name: 'Events', icon: <EventsIcon />, section: 'events' },
                { name: 'Recommendations', icon: <RecommendationsIcon />, section: 'recommendations' },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <div className="w-14 h-14 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

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

import React, { useState } from 'react';
import { Calendar, ArrowRight, ExternalLink, MapPin, Star, ChevronRight, Search } from 'lucide-react';
import { thoughts, learnings, projects, events, aboutInfo } from '../data/mock';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { ThoughtsIcon, LearningsIcon, ProjectsIcon, EventsIcon, RecommendationsIcon } from './Dock';
import RecommendationsContent from './RecommendationsContent';

const WindowModal = ({ type, onClose }) => {
  const [selectedThought, setSelectedThought] = useState(null);

  const renderContent = () => {
    switch (type) {
      case 'thoughts':
        return thoughts.length > 0 ? (
          <div className="flex h-full">
            <div className="w-72 border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search thoughts..." 
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-gray-700 rounded-lg text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {thoughts.map((thought) => (
                    <div
                      key={thought.id}
                      onClick={() => setSelectedThought(thought)}
                      className={`p-3 rounded-lg cursor-pointer mb-1 transition-colors ${
                        selectedThought?.id === thought.id
                          ? 'bg-yellow-100 dark:bg-yellow-900/30'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200 line-clamp-1">{thought.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{thought.date}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">{thought.excerpt}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex-1 flex flex-col">
              {selectedThought ? (
                <>
                  {selectedThought.coverImage && (
                    <div className="h-48 relative">
                      <img 
                        src={selectedThought.coverImage} 
                        alt={selectedThought.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6">
                        <h2 className="text-2xl font-bold text-white">{selectedThought.title}</h2>
                        <p className="text-white/70 text-sm mt-1">{selectedThought.date}</p>
                      </div>
                    </div>
                  )}
                  <ScrollArea className="flex-1">
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedThought.content || selectedThought.excerpt}
                      </p>
                    </div>
                  </ScrollArea>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  Select a thought to read
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-1">Thoughts</p>
              <p className="text-sm">Coming soon</p>
            </div>
          </div>
        );

      case 'learnings':
        return learnings.length > 0 ? (
          <div className="flex h-full">
            <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-orange-50/30 dark:bg-gray-800/30 flex flex-col">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Categories</h3>
              </div>
              <div className="p-2 space-y-1">
                {['All', 'Work', 'Life', 'Relationships', 'Observation'].map((cat) => (
                  <button
                    key={cat}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-orange-100 dark:hover:bg-orange-900/20 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-4">
                {learnings.map((learning) => (
                  <div 
                    key={learning.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                            {learning.category}
                          </Badge>
                          <span className="text-xs text-gray-400">{learning.date}</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{learning.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{learning.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-1">Learnings</p>
              <p className="text-sm">Coming soon</p>
            </div>
          </div>
        );

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Window */}
      <div className={`relative rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-xl ${isExtraLargeWindow ? 'w-full max-w-6xl h-[80vh]' : isLargeWindow ? 'w-full max-w-4xl h-[75vh]' : 'w-full max-w-2xl'}`}>
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"
            />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {getWindowTitle()}
          </span>
          <div className="w-16" />
        </div>

        {/* Content */}
        {isLargeWindow || isExtraLargeWindow ? (
          <div className={`${isExtraLargeWindow ? 'h-[calc(80vh-52px)]' : 'h-[calc(75vh-52px)]'}`}>
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

import React from 'react';
import { ThoughtsIcon, LearningsIcon, ProjectsIcon, EventsIcon, RecommendationsIcon } from '../Dock';

const FinderSection = () => (
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

export default FinderSection;

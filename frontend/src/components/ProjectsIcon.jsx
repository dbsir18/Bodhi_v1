import React from 'react';

const ProjectsIcon = ({ onClick }) => {
  return (
    <div 
      className="fixed top-16 left-24 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-1 transition-transform duration-200 group-hover:scale-105">
        <div className="relative">
          {/* macOS Folder Icon - Blue Style */}
          <div className="w-16 h-14 relative">
            {/* Folder back */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#5AC8FA] to-[#007AFF] shadow-lg" />
            {/* Folder tab */}
            <div className="absolute -top-1.5 left-2 w-6 h-3 rounded-t-md bg-gradient-to-b from-[#5AC8FA] to-[#34AADC]" />
            {/* Folder front */}
            <div className="absolute bottom-0 left-0 right-0 h-10 rounded-lg bg-gradient-to-b from-[#34AADC] to-[#007AFF] shadow-inner" />
            {/* Folder lines */}
            <div className="absolute bottom-3 left-3 right-3 space-y-1">
              <div className="h-0.5 bg-white/20 rounded" />
              <div className="h-0.5 bg-white/20 rounded w-3/4" />
            </div>
          </div>
          {/* Badge */}
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
            7
          </span>
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center mt-1">
          Projects
        </span>
      </div>
    </div>
  );
};

export default ProjectsIcon;

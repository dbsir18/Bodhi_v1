import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { changelogEntries } from '../data/mock';

const TopBar = ({ isDark, toggleTheme }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-50 bg-transparent">
      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        Dhruv Bhargava
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors outline-none">
            Changelog
            <ChevronDown className="w-3 h-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50">
            {changelogEntries.map((entry, index) => (
              <DropdownMenuItem key={index} className="flex flex-col items-start gap-0.5 py-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{entry.date}</span>
                <span className="text-sm text-gray-800 dark:text-gray-200">{entry.entry}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          {formatDate(currentTime)} <span className="font-medium">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

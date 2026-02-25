import React, { useState, useEffect } from 'react';
import { gitaVerses } from '../data/mock';

const GitaDisplay = () => {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const verse = gitaVerses[currentVerse];

  useEffect(() => {
    // Cycle through verses every 45 seconds
    const interval = setInterval(() => {
      setIsLoaded(false);
      setCurrentVerse((prev) => (prev + 1) % gitaVerses.length);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Gita Image Frame with shadow effect */}
      <div className="relative">
        {/* Outer frame shadow */}
        <div className="absolute -inset-1 bg-gradient-to-b from-amber-200 to-amber-300 dark:from-amber-700 dark:to-amber-800 rounded-sm shadow-2xl" />
        
        {/* Inner mat/frame */}
        <div className="relative bg-[#faf6ee] dark:bg-gray-700 p-3 rounded-sm shadow-lg">
          {/* Image container */}
          <div 
            className="relative overflow-hidden bg-[#faf6ee] dark:bg-gray-600" 
            style={{ maxHeight: '75vh', maxWidth: '50vw' }}
          >
            <img
              src={verse.image}
              alt={`Bhagavad Gita Chapter ${verse.chapter}, Verse ${verse.verse}`}
              className={`w-auto h-auto max-h-[72vh] object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#faf6ee] dark:bg-gray-700 min-h-[50vh] min-w-[35vw]">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-amber-600 rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
        
        {/* Drop shadow beneath frame */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/15 dark:bg-black/30 blur-xl rounded-full" />
      </div>

      {/* Gita Verse Info - positioned at bottom right */}
      <div className="fixed bottom-8 right-8 text-right max-w-md">
        <p className="text-lg font-medium text-amber-800 dark:text-amber-300 font-serif italic mb-1">
          "{verse.sanskrit}"
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {verse.translation}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          — Bhagavad Gita, Chapter {verse.chapter}, Verse {verse.verse}
        </p>
      </div>
    </div>
  );
};

export default GitaDisplay;

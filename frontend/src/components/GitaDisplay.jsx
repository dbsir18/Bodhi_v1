import React, { useState, useEffect } from 'react';
import { gitaVerses } from '../data/mock';

const GitaDisplay = () => {
  const [currentVerse, setCurrentVerse] = useState(0);

  const verse = gitaVerses[currentVerse];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % gitaVerses.length);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 text-right max-w-md z-10">
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
  );
};

export default GitaDisplay;

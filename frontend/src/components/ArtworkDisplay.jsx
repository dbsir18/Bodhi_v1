import React, { useState, useEffect } from 'react';
import { artworks } from '../data/mock';

const ArtworkDisplay = () => {
  const [currentArtwork, setCurrentArtwork] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const artwork = artworks[currentArtwork];

  useEffect(() => {
    // Cycle through artworks every 30 seconds
    const interval = setInterval(() => {
      setIsLoaded(false);
      setCurrentArtwork((prev) => (prev + 1) % artworks.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* Artwork Frame with shadow effect */}
      <div className="relative">
        {/* Outer frame shadow */}
        <div className="absolute -inset-1 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-sm shadow-2xl" />
        
        {/* Inner mat/frame */}
        <div className="relative bg-[#f8f4ec] dark:bg-gray-700 p-3 rounded-sm shadow-lg">
          {/* Artwork container */}
          <div 
            className="relative overflow-hidden bg-[#faf6ee] dark:bg-gray-600" 
            style={{ maxHeight: '60vh', maxWidth: '40vw' }}
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className={`w-auto h-auto max-h-[55vh] object-contain transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f8f4ec] dark:bg-gray-700 min-h-[40vh] min-w-[30vw]">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
        
        {/* Drop shadow beneath frame */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/15 dark:bg-black/30 blur-xl rounded-full" />
      </div>

      {/* Artwork Info - positioned at bottom right */}
      <div className="fixed bottom-8 right-8 text-right">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {artwork.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {artwork.artist}, {artwork.year}
        </p>
      </div>
    </div>
  );
};

export default ArtworkDisplay;

import React, { useState, useEffect } from 'react';
import { galleryPaintings } from '../data/mock';

const ArtGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const painting = galleryPaintings[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setIsLoaded(false);
        setCurrentIndex((prev) => (prev + 1) % galleryPaintings.length);
        setIsTransitioning(false);
      }, 500);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  if (!painting) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-0">
        <div className="relative w-[70vw] h-[70vh] flex items-center justify-center">
          <img
            src={painting.image}
            alt={`${painting.title} by ${painting.artist}`}
            className={`max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-700 ${
              isLoaded && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
          />
          
          {!isLoaded && !isTransitioning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber-400/50 border-t-amber-600 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      <a
        href={painting.wikiUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 right-8 text-right transition-opacity duration-500 z-10 group ${
          isLoaded && !isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-base font-medium text-gray-700 dark:text-gray-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
          {painting.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {painting.artist !== "Unknown" ? `${painting.artist}, ${painting.year}` : `${painting.year}`}
        </p>
      </a>
    </>
  );
};

export default ArtGallery;

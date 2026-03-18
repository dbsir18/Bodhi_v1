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

  const visible = isLoaded && !isTransitioning;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-0">
        <div className={`relative w-[88vw] md:w-[55vw] h-[50vh] md:h-[70vh] flex items-center justify-center transition-all duration-700 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
        }`}>
          <div className="relative">
            <img
              src={painting.image}
              alt={`${painting.title} by ${painting.artist}`}
              className="max-w-full max-h-[50vh] md:max-h-[70vh] w-auto h-auto object-contain rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/5"
              onLoad={() => setIsLoaded(true)}
            />
          </div>

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
        className={`fixed bottom-20 md:bottom-8 right-4 md:right-8 text-right z-10 group transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
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

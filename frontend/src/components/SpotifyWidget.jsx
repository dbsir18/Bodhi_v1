import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { spotifyPlaylist } from '../data/mock';

const SpotifyWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 left-20 z-30">
      <div 
        className={`bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-80 h-96' : 'w-72 h-20'
        }`}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">On Rotation</span>
          </div>
          <a 
            href={spotifyPlaylist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            Open
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Spotify Embed */}
        <div className={`${isExpanded ? 'block' : 'hidden'}`}>
          <iframe
            style={{ borderRadius: '12px' }}
            src={spotifyPlaylist.embedUrl}
            width="100%"
            height="320"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          />
        </div>

        {/* Collapsed View */}
        {!isExpanded && (
          <div className="px-3 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-white">{spotifyPlaylist.name}</div>
                <div className="text-xs text-gray-400">{spotifyPlaylist.creator}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyWidget;

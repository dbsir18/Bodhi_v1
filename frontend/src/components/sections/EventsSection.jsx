import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, ArrowLeft, MapPin } from 'lucide-react';
import { events } from '../../data/mock';
import { ScrollArea } from '../ui/scroll-area';
import { slugify } from '../../App';

const EventsSection = ({ articleSlug, onArticleChange }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sync with URL slug
  useEffect(() => {
    if (articleSlug) {
      const found = events.find(e => slugify(e.title) === articleSlug);
      if (found) setSelectedEvent(found);
    } else {
      setSelectedEvent(null);
    }
  }, [articleSlug]);

  const selectEvent = (event) => {
    setSelectedEvent(event);
    onArticleChange?.(slugify(event.title));
  };

  const clearSelection = () => {
    setSelectedEvent(null);
    onArticleChange?.(null);
  };

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-gray-400 dark:text-gray-500">
        <div className="text-center">
          <Calendar className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
          <p className="text-lg mb-1 font-medium">Events</p>
          <p className="text-sm">Coming soon</p>
        </div>
      </div>
    );
  }

  // Single event detail view
  if (selectedEvent) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-200/80 dark:border-stone-700/60 shrink-0">
          <button onClick={clearSelection} className="p-1 -ml-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800">
            <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
          </button>
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300 truncate">{selectedEvent.title}</span>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">
            {selectedEvent.poster && (
              <img src={selectedEvent.poster} alt={selectedEvent.title} className="w-full max-h-72 object-cover rounded-xl mb-6" />
            )}
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">{selectedEvent.title}</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{selectedEvent.date}</span>
              {selectedEvent.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{selectedEvent.location}</span>}
            </div>
            {selectedEvent.description && (
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">{selectedEvent.description}</p>
            )}
            {selectedEvent.lumaUrl && (
              <a href={selectedEvent.lumaUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium hover:opacity-90 transition-opacity">
                View on Luma <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  }

  // Event grid
  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => selectEvent(event)}
              className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative h-40">
                <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold">{event.title}</h3>
                  <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />{event.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default EventsSection;

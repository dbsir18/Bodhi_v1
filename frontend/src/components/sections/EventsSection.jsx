import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { events } from '../../data/mock';

const EventsSection = () => {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-gray-400 dark:text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-1">Events</p>
          <p className="text-sm">Coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Events</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="relative h-40">
              <img
                src={event.poster}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold">{event.title}</h3>
                <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  {event.date}
                </p>
              </div>
            </div>
            <div className="p-3">
              <a
                href={event.lumaUrl}
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                View <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;

import React from 'react';
import { Dumbbell, Trophy, Flag, Plane } from 'lucide-react';
import { aboutInfo } from '../../data/mock';

const funIcons = {
  Gym: Dumbbell,
  'Manchester United': Trophy,
  F1: Flag,
  Travel: Plane,
};

const AboutSection = () => (
  <div className="flex items-center justify-center h-full p-6">
    <div className="max-w-sm w-full space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-1.5">
          {aboutInfo.name}
        </h2>
        <p className="text-xs text-stone-400 dark:text-stone-500 tracking-widest uppercase">
          {aboutInfo.location} &nbsp;·&nbsp; {aboutInfo.education}
        </p>
      </div>

      {/* Quote */}
      <p className="text-base italic text-stone-500 dark:text-stone-400 border-l-2 border-amber-400 pl-3 leading-relaxed">
        {aboutInfo.bio}
      </p>

      {/* Currently */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2.5">Currently</p>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-sm text-stone-700 dark:text-stone-300">
            {aboutInfo.current.role} @{' '}
            <a href={aboutInfo.current.url} target="_blank" rel="noopener noreferrer"
              className="text-amber-700 dark:text-amber-400 hover:underline underline-offset-2">
              {aboutInfo.current.company}
            </a>
          </span>
        </div>
      </div>

      {/* Previously */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2.5">Previously</p>
        <div className="flex flex-wrap gap-2">
          {aboutInfo.previous.map((p) => (
            <a
              key={p.company}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
            >
              {p.company}
            </a>
          ))}
        </div>
      </div>

      {/* Outside Work */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2.5">Outside work</p>
        <div className="flex flex-wrap gap-2">
          {aboutInfo.fun.map((item) => {
            const Icon = funIcons[item];
            return (
              <div
                key={item}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {item}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  </div>
);

export default AboutSection;

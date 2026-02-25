import React, { useState, useMemo } from 'react';
import { Smartphone, Package, Wine, User, BookOpen, ExternalLink, Trophy } from 'lucide-react';
import { recommendations, gymSessions } from '../data/mock';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

const categories = [
  { key: 'wins', label: 'Wins', icon: Trophy, color: 'from-orange-500 to-red-600', emptyText: 'Wins & streaks' },
  { key: 'apps', label: 'Apps', icon: Smartphone, color: 'from-violet-500 to-purple-600', emptyText: 'Apps & tools I swear by' },
  { key: 'products', label: 'Products', icon: Package, color: 'from-amber-500 to-orange-600', emptyText: 'Products I use daily' },
  { key: 'bars', label: 'Bars & Places', icon: Wine, color: 'from-rose-500 to-pink-600', emptyText: 'Bars & places worth visiting' },
  { key: 'people', label: 'People', icon: User, color: 'from-blue-500 to-cyan-600', emptyText: 'People I recommend' },
  { key: 'content', label: 'Content', icon: BookOpen, color: 'from-emerald-500 to-teal-600', emptyText: 'Content worth your time' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const GymCalendar = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const isDark = document.documentElement.classList.contains('dark');

  const emptyColor = isDark ? '#161b22' : '#ebedf0';
  const activeColor = isDark ? '#39d353' : '#26a641';

  const { weeks, monthLabels } = useMemo(() => {
    const sessionSet = new Set(gymSessions.map(s => s.date));
    const today = new Date();
    // July 1 2025 is a Tuesday — align to Monday June 30 so the grid is clean,
    // but hide any day before July 1
    const startDate = new Date('2025-06-30');

    const weeks = [];
    const monthLabels = [];
    let currentDate = new Date(startDate);

    while (currentDate <= today) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const beforeStart = currentDate < new Date('2025-07-01');
        const hasSession = sessionSet.has(dateStr);

        if (d === 0 && (weeks.length === 0 || currentDate.getDate() <= 7)) {
          monthLabels.push({ weekIndex: weeks.length, month: MONTHS[currentDate.getMonth()] });
        }

        week.push({
          date: dateStr,
          active: hasSession,
          isToday: dateStr === today.toISOString().split('T')[0],
          isFuture: currentDate > today,
          isBeforeStart: beforeStart,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }

    return { weeks, monthLabels };
  }, []);

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Gym</p>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col" style={{ minWidth: 'max-content' }}>
          {/* Month labels */}
          <div className="flex ml-8 mb-1">
            {monthLabels.map((label, i) => (
              <span
                key={i}
                className="text-[10px] text-gray-400 dark:text-gray-500"
                style={{ position: 'relative', left: `${label.weekIndex * 15}px` }}
              >
                {label.month}
              </span>
            ))}
          </div>

          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-2">
              {DAYS.map((day, i) => (
                <div key={i} className="h-[11px] flex items-center">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 w-6 text-right">{day}</span>
                </div>
              ))}
            </div>

            {/* Cells */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const hidden = day.isFuture || day.isBeforeStart;
                    return (
                      <div
                        key={day.date}
                        className={`w-[11px] h-[11px] rounded-[2px] ${
                          hidden ? 'opacity-0' : ''
                        }`}
                        style={{ backgroundColor: hidden ? 'transparent' : (day.active ? activeColor : emptyColor) }}
                        onMouseEnter={() => !hidden && setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Hover info */}
          <div className="h-5 mt-2">
            {hoveredDay && (
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {new Date(hoveredDay.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                {hoveredDay.active && <span className="text-green-600 dark:text-green-400 font-medium"> — worked out</span>}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecommendationCard = ({ item }) => {
  const Wrapper = item.url && item.url !== '#' ? 'a' : 'div';
  const linkProps = item.url && item.url !== '#' ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Wrapper
      {...linkProps}
      className="group flex items-center gap-4 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-gray-800 dark:text-gray-100 truncate">{item.name}</h4>
          {item.tag && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
              {item.tag}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>
      </div>
      {item.url && item.url !== '#' && (
        <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0" />
      )}
    </Wrapper>
  );
};

const RecommendationsContent = () => {
  const [activeTab, setActiveTab] = useState('wins');
  const activeCat = categories.find(c => c.key === activeTab);
  const items = recommendations[activeTab] || [];

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-56 border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col py-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.key;
          const count = cat.key === 'wins' ? null : (recommendations[cat.key] || []).length;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-gray-800 dark:text-gray-200' : ''}`} />
              <span className="flex-1 text-left">{cat.label}</span>
              {count > 0 && (
                <span className={`text-xs ${isActive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {activeTab === 'wins' ? (
            <GymCalendar />
          ) : items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeCat.color} flex items-center justify-center mb-4 shadow-lg`}>
                <activeCat.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {activeCat.emptyText}
              </p>
              <p className="text-gray-300 dark:text-gray-600 text-xs mt-1">Coming soon</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecommendationsContent;

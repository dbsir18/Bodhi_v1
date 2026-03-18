import React, { useState, useMemo } from 'react';
import { Smartphone, Package, Wine, User, BookOpen, ExternalLink, Trophy, MapPin, Heart } from 'lucide-react';
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
// Mon=0 … Sun=6 (ISO weekday - 1)
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Returns ISO weekday index 0=Mon … 6=Sun for a given Date
const isoWeekday = (d) => (d.getDay() + 6) % 7;

// Build an array of month-blocks from July 2025 → today.
// Each block = { label, weeks } where weeks is an array of 7-element columns
// (null = empty padding cell, otherwise a day object).
const buildMonthBlocks = (sessionSet, today) => {
  const todayStr = today.toISOString().split('T')[0];
  const blocks = [];

  let year = 2025;
  let month = 6; // 0-indexed: 6 = July

  while (year < today.getFullYear() || (year === today.getFullYear() && month <= today.getMonth())) {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = isoWeekday(firstDay); // blank cells before day 1

    // Build flat list of cells: nulls for padding, then real days
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      if (date > today) break;
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        date: dateStr,
        active: sessionSet.has(dateStr),
        isToday: dateStr === todayStr,
      });
    }

    // Chunk into columns of 7 (Mon→Sun)
    const weeks = [];
    for (let col = 0; col < cells.length; col += 7) {
      weeks.push(cells.slice(col, col + 7));
    }
    // Pad last column to 7 rows so the grid is rectangular
    if (weeks.length > 0) {
      const last = weeks[weeks.length - 1];
      while (last.length < 7) last.push(null);
    }

    blocks.push({ label: MONTHS[month], weeks });

    month++;
    if (month > 11) { month = 0; year++; }
  }

  return blocks;
};

const GymCalendar = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const emptyColor = isDark ? '#161b22' : '#ebedf0';
  const activeColor = isDark ? '#39d353' : '#26a641';

  const blocks = useMemo(() => {
    const sessionSet = new Set(gymSessions.map(s => s.date));
    const today = new Date();
    return buildMonthBlocks(sessionSet, today);
  }, []);

  const CELL = 11;
  const GAP = 3;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Gym</p>

      <div className="overflow-x-auto">
        <div className="inline-flex flex-col" style={{ minWidth: 'max-content' }}>
          {/* Month labels + grids side by side */}
          <div className="flex items-start gap-4">
            {/* Day-of-week labels pinned on the left */}
            <div className="flex flex-col gap-[3px] mt-[18px] shrink-0">
              {DAY_LABELS.map((day) => (
                <div key={day} style={{ height: CELL }} className="flex items-center">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 w-6 text-right">{day}</span>
                </div>
              ))}
            </div>

            {/* One block per month */}
            {blocks.map((block) => (
              <div key={block.label} className="flex flex-col">
                {/* Month label */}
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 h-[14px] leading-[14px]">
                  {block.label}
                </span>

                {/* Columns */}
                <div className="flex" style={{ gap: GAP }}>
                  {block.weeks.map((col, wi) => (
                    <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                      {col.map((day, di) => {
                        if (!day) {
                          return (
                            <div
                              key={`pad-${wi}-${di}`}
                              style={{ width: CELL, height: CELL, backgroundColor: 'transparent' }}
                            />
                          );
                        }
                        return (
                          <div
                            key={day.date}
                            style={{
                              width: CELL,
                              height: CELL,
                              borderRadius: 2,
                              backgroundColor: day.active ? activeColor : emptyColor,
                              outline: day.isToday ? '1px solid #888' : 'none',
                              outlineOffset: 1,
                            }}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hover info */}
          <div className="h-5 mt-2 ml-8">
            {hoveredDay ? (
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {new Date(hoveredDay.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                {hoveredDay.active && <span className="text-green-600 dark:text-green-400 font-medium"> · worked out</span>}
              </span>
            ) : (
              <span className="text-[11px] text-gray-400 dark:text-gray-600">Hover a day</span>
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
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {item.description}
          {item.link && (
            <>
              {' '}
              <a
                href={item.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                {item.link.text}
              </a>
            </>
          )}
        </p>
      </div>
      {item.url && item.url !== '#' && (
        <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0" />
      )}
    </Wrapper>
  );
};

const CITY_THEMES = {
  Delhi:     { gradient: 'from-rose-500 to-red-600',    text: 'text-rose-700 dark:text-rose-400',    bg: 'bg-rose-50 dark:bg-rose-950/20',    border: 'border-rose-200 dark:border-rose-800/40' },
  Goa:       { gradient: 'from-emerald-400 to-teal-500', text: 'text-teal-700 dark:text-teal-400',    bg: 'bg-teal-50 dark:bg-teal-950/20',    border: 'border-teal-200 dark:border-teal-800/40' },
  Bangalore: { gradient: 'from-violet-500 to-purple-600', text: 'text-violet-700 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/20', border: 'border-violet-200 dark:border-violet-800/40' },
  Jaipur:    { gradient: 'from-amber-400 to-orange-500', text: 'text-amber-700 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-950/20',  border: 'border-amber-200 dark:border-amber-800/40' },
};

const BarsContent = ({ bars }) => {
  const grouped = useMemo(() => {
    const cities = ['Delhi', 'Goa', 'Bangalore', 'Jaipur'];
    return cities
      .map(city => ({ city, items: bars.filter(b => b.city === city) }))
      .filter(g => g.items.length > 0);
  }, [bars]);

  return (
    <div className="space-y-7">
      {grouped.map(({ city, items }) => {
        const theme = CITY_THEMES[city] || CITY_THEMES.Delhi;
        return (
          <div key={city}>
            <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700/40">
              <MapPin className={`w-3.5 h-3.5 ${theme.text}`} strokeWidth={2.5} />
              <h3 className={`text-xs font-semibold tracking-widest uppercase ${theme.text}`}>
                {city}
              </h3>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-normal normal-case ml-auto">
                {items.length} {items.length === 1 ? 'spot' : 'spots'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5">
              {items.map((bar) => (
                <a
                  key={bar.id}
                  href={bar.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-2.5 px-1 border-b border-gray-50 dark:border-gray-800/40 last:border-0 hover:bg-gray-50/80 dark:hover:bg-gray-800/30 rounded-md transition-colors duration-150"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm text-gray-800 dark:text-gray-200 truncate">
                      {bar.name}
                    </span>
                    {bar.tag === 'FAV' && (
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500 shrink-0" />
                    )}
                  </div>
                  <MapPin className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RecommendationsContent = () => {
  const [activeTab, setActiveTab] = useState('wins');
  const activeCat = categories.find(c => c.key === activeTab);
  const items = recommendations[activeTab] || [];

  return (
    <div className="h-full flex flex-col md:flex-row">

      {/* Mobile: horizontal scrollable tab strip */}
      <div className="md:hidden flex-none border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 relative">
        {/* Right fade hint */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-gray-50/90 dark:from-gray-800/90 to-transparent z-10" />
        <div className="overflow-x-auto scrollbar-none">
        <div className="flex gap-1 p-2 min-w-max">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {cat.label}
              </button>
            );
          })}
        </div>
        </div>
      </div>

      {/* Desktop: vertical sidebar */}
      <div className="hidden md:flex w-56 border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 flex-col py-3">
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
        <div className="p-4 md:p-6">
          {activeTab === 'wins' ? (
            <GymCalendar />
          ) : activeTab === 'bars' && items.length > 0 ? (
            <BarsContent bars={items} />
          ) : items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[40vh] text-center">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeCat.color} flex items-center justify-center mb-4 shadow-lg`}>
                <activeCat.icon className="w-7 h-7 text-white" />
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

import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell, Legend
} from 'recharts';

// — Soft Power & Tourism Comparison —
const comparisonData = [
  { metric: 'Soft Power Rank', India: 29, Japan: 4, Korea: 11, lower: true },
  { metric: 'Tourists (M)', India: 9.95, Japan: 42.7, Korea: 17.5 },
  { metric: 'Top 50 Franchises', India: 0, Japan: 8, Korea: 1 },
  { metric: 'Duolingo Rank', India: null, Japan: 4, Korea: 6, lower: true },
  { metric: 'Netflix Share %', India: 1, Japan: 3, Korea: 8 },
];

const COLORS = {
  india: '#d97706',   // amber-600
  japan: '#dc2626',   // red-600
  korea: '#2563eb',   // blue-600
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-stone-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-2xl border border-stone-700/50 text-sm">
      <p className="font-semibold text-stone-300 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.fill || p.color }} />
          <span className="text-stone-400">{p.name}:</span>
          <span className="font-medium">{p.value ?? '—'}</span>
        </div>
      ))}
    </div>
  );
};

function SoftPowerComparison() {
  const chartData = [
    { name: 'Soft Power\nRank', India: 29, Japan: 4, Korea: 11 },
    { name: 'Tourists\n(millions)', India: 9.95, Japan: 42.7, Korea: 17.5 },
    { name: 'Top 50 Media\nFranchises', India: 0, Japan: 8, Korea: 1 },
    { name: 'Netflix Global\nShare %', India: 1, Japan: 3, Korea: 8 },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        Cultural Scoreboard
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        India vs. Japan vs. Korea across key soft power metrics
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barGap={2} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#78716c' }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar dataKey="India" fill={COLORS.india} radius={[4, 4, 0, 0]} name="India" />
          <Bar dataKey="Japan" fill={COLORS.japan} radius={[4, 4, 0, 0]} name="Japan" />
          <Bar dataKey="Korea" fill={COLORS.korea} radius={[4, 4, 0, 0]} name="Korea" />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 12, color: '#78716c' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// — Language Learning Impact —
const languageData = [
  { lang: 'English', rank: 1, color: '#6b7280' },
  { lang: 'Spanish', rank: 2, color: '#6b7280' },
  { lang: 'French', rank: 3, color: '#6b7280' },
  { lang: 'Japanese', rank: 4, color: COLORS.japan },
  { lang: 'German', rank: 5, color: '#6b7280' },
  { lang: 'Korean', rank: 6, color: COLORS.korea },
  { lang: 'Italian', rank: 7, color: '#6b7280' },
  { lang: 'Chinese', rank: 8, color: '#6b7280' },
  { lang: 'Portuguese', rank: 9, color: '#6b7280' },
  { lang: 'Turkish', rank: 10, color: '#6b7280' },
];

function LanguageLearningChart() {
  const chartData = languageData.map(d => ({ ...d, value: 11 - d.rank }));

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        Duolingo Top 10 Languages
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        Hindi doesn't crack the list. Korean surpassed Italian — powered by K-dramas & BTS.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" barSize={20}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.06} horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            dataKey="lang"
            type="category"
            tick={{ fontSize: 12, fill: '#78716c' }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.[0]) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-stone-900/95 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl shadow-2xl border border-stone-700/50 text-sm">
                <span className="font-semibold">{d.lang}</span> — #{d.rank} globally
              </div>
            );
          }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]}>
            {chartData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} opacity={entry.lang === 'Japanese' || entry.lang === 'Korean' ? 1 : 0.35} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: COLORS.japan }} /> Japanese — cultural export
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: COLORS.korea }} /> Korean — cultural export
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-stone-400 opacity-40" /> No cultural export driver
        </span>
      </div>
    </div>
  );
}

// — Franchise Revenue —
const franchiseData = [
  { name: 'Pokémon', revenue: 115, country: 'Japan' },
  { name: 'Hello Kitty', revenue: 89, country: 'Japan' },
  { name: 'Mickey Mouse', revenue: 83, country: 'USA' },
  { name: 'Star Wars', revenue: 70, country: 'USA' },
  { name: 'Mario', revenue: 55, country: 'Japan' },
  { name: 'Disney Princess', revenue: 46.4, country: 'USA' },
  { name: 'Anpanman', revenue: 45, country: 'Japan' },
  { name: 'Marvel', revenue: 38, country: 'USA' },
  { name: 'Harry Potter', revenue: 35, country: 'UK' },
  { name: 'Spider-Man', revenue: 33, country: 'USA' },
];

function FranchiseChart() {
  const getColor = (country) => {
    if (country === 'Japan') return COLORS.japan;
    if (country === 'USA') return '#6b7280';
    return '#9ca3af';
  };

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        Top 10 Highest-Grossing Media Franchises
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        4 of the top 10 are Japanese. India owns zero of the top 50.
      </p>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={franchiseData} layout="vertical" barSize={22}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.06} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#78716c' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${v}B`}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12, fill: '#78716c' }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.[0]) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-stone-900/95 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl shadow-2xl border border-stone-700/50 text-sm">
                <p className="font-semibold">{d.name}</p>
                <p className="text-stone-400">${d.revenue}B+ total revenue</p>
                <p className="text-stone-500 text-xs mt-0.5">{d.country}</p>
              </div>
            );
          }} />
          <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
            {franchiseData.map((entry, idx) => (
              <Cell key={idx} fill={getColor(entry.country)} opacity={entry.country === 'Japan' ? 1 : 0.4} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.japan }} /> Japan
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-500 opacity-40" /> Other
        </span>
      </div>
    </div>
  );
}

// — Reach vs Gravity (Interactive) —
const gravityData = [
  { name: 'BTS (Korea)', reach: 95, gravity: 95, country: 'Korea' },
  { name: 'Squid Game', reach: 90, gravity: 85, country: 'Korea' },
  { name: 'Pokémon', reach: 98, gravity: 92, country: 'Japan' },
  { name: 'Anime', reach: 85, gravity: 80, country: 'Japan' },
  { name: 'RRR', reach: 60, gravity: 55, country: 'India' },
  { name: 'Bollywood', reach: 55, gravity: 20, country: 'India' },
  { name: 'Diljit Tour', reach: 45, gravity: 15, country: 'India' },
  { name: 'Pocket FM', reach: 40, gravity: 10, country: 'India' },
  { name: 'Sacred Games', reach: 35, gravity: 30, country: 'India' },
];

function ReachVsGravityChart() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const getColor = (country) => {
    if (country === 'India') return COLORS.india;
    if (country === 'Japan') return COLORS.japan;
    return COLORS.korea;
  };

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        Reach vs. Gravity
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
        Reach is your existing community finding you somewhere new. Gravity is strangers being pulled in. Hover to explore.
      </p>
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {/* Grid */}
          <defs>
            <linearGradient id="gravityGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {/* Quadrant labels */}
          <text x="100" y="40" textAnchor="middle" className="fill-stone-300 dark:fill-stone-600 text-[10px]" fontSize="10">Low Reach, High Gravity</text>
          <text x="320" y="40" textAnchor="middle" className="fill-stone-300 dark:fill-stone-600 text-[10px]" fontSize="10">High Reach, High Gravity</text>
          <text x="100" y="280" textAnchor="middle" className="fill-stone-300 dark:fill-stone-600 text-[10px]" fontSize="10">Low Reach, Low Gravity</text>
          <text x="320" y="280" textAnchor="middle" className="fill-stone-300 dark:fill-stone-600 text-[10px]" fontSize="10">High Reach, Low Gravity</text>
          {/* Axes */}
          <line x1="40" y1="270" x2="390" y2="270" stroke="currentColor" strokeOpacity="0.15" />
          <line x1="40" y1="20" x2="40" y2="270" stroke="currentColor" strokeOpacity="0.15" />
          <text x="215" y="295" textAnchor="middle" className="fill-stone-500" fontSize="11">Reach →</text>
          <text x="15" y="145" textAnchor="middle" className="fill-stone-500" fontSize="11" transform="rotate(-90, 15, 145)">Gravity →</text>
          {/* Diagonal reference */}
          <line x1="40" y1="270" x2="390" y2="20" stroke="currentColor" strokeOpacity="0.06" strokeDasharray="4 4" />
          {/* Data points */}
          {gravityData.map((d, i) => {
            const x = 40 + (d.reach / 100) * 350;
            const y = 270 - (d.gravity / 100) * 250;
            const isHovered = hoveredItem === i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={x} cy={y}
                  r={isHovered ? 10 : 7}
                  fill={getColor(d.country)}
                  opacity={isHovered ? 1 : 0.75}
                  stroke="white"
                  strokeWidth={isHovered ? 2 : 0}
                  style={{ transition: 'all 0.2s ease' }}
                />
                {(isHovered || d.name === 'RRR') && (
                  <text
                    x={x}
                    y={y - 14}
                    textAnchor="middle"
                    fontSize="10"
                    className="fill-stone-700 dark:fill-stone-300"
                    fontWeight={isHovered ? 600 : 400}
                  >
                    {d.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.india }} /> India</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.japan }} /> Japan</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.korea }} /> Korea</span>
      </div>
    </div>
  );
}

// — Main Export Component —
export default function ExportCultureCharts() {
  const [activeChart, setActiveChart] = useState(0);

  const charts = [
    { label: 'Scoreboard', component: <SoftPowerComparison /> },
    { label: 'Franchises', component: <FranchiseChart /> },
    { label: 'Languages', component: <LanguageLearningChart /> },
    { label: 'Reach vs Gravity', component: <ReachVsGravityChart /> },
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 dark:border-stone-700/60 bg-white/60 dark:bg-stone-800/40 backdrop-blur-sm overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b border-stone-200/80 dark:border-stone-700/60 bg-stone-50/80 dark:bg-stone-900/40 px-2 pt-2">
        {charts.map((chart, i) => (
          <button
            key={i}
            onClick={() => setActiveChart(i)}
            className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-all ${
              activeChart === i
                ? 'bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-400 border border-b-0 border-stone-200/80 dark:border-stone-700/60 -mb-px'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            {chart.label}
          </button>
        ))}
      </div>
      {/* Chart Content */}
      <div className="p-6">
        {charts[activeChart].component}
      </div>
    </div>
  );
}

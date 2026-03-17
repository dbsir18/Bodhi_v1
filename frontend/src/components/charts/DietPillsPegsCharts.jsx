import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, Cell, Legend, PieChart, Pie
} from 'recharts';

const COLORS = {
  premium: '#d97706',
  economy: '#78716c',
  country: '#d6d3d1',
  glp1: '#059669',
  alcohol: '#dc2626',
  muted: '#a8a29e',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-stone-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-2xl border border-stone-700/50 text-sm">
      <p className="font-semibold text-stone-300 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.fill || p.color || p.stroke }} />
          <span className="text-stone-400">{p.name}:</span>
          <span className="font-medium">{p.value}{typeof p.value === 'number' && p.unit ? p.unit : ''}</span>
        </div>
      ))}
    </div>
  );
};

// — Alcohol Market Pyramid —
function MarketPyramid() {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const segments = [
    { name: 'Premium Spirits (₹1,000+)', volume: 12, value: 43, growth: '13-14%', color: '#d97706', desc: 'Where all the investment is going' },
    { name: 'Standard IMFL', volume: 25, value: 30, growth: '6-8%', color: '#92400e', desc: 'Mid-market spirits' },
    { name: 'Economy IMFL', volume: 33, value: 18, growth: '3-4%', color: '#78716c', desc: 'Mass-market spirits' },
    { name: 'Country Liquor', volume: 30, value: 9, growth: '1-2%', color: '#d6d3d1', desc: 'GLP-1 doesn\'t touch this' },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        India's ₹5.3 Lakh Crore Alcohol Pyramid
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
        10-12% of volume, 40-45% of value. GLP-1 targets exactly the top.
      </p>
      <div className="flex gap-6">
        {/* Pyramid visualization */}
        <div className="flex-1 flex flex-col items-center">
          <svg viewBox="0 0 300 260" className="w-full max-w-xs">
            {segments.map((seg, i) => {
              const topWidth = 40 + i * 60;
              const bottomWidth = 40 + (i + 1) * 60;
              const y = i * 60;
              const height = 55;
              const isHovered = hoveredSlice === i;

              return (
                <g
                  key={i}
                  onMouseEnter={() => setHoveredSlice(i)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    d={`M${150 - topWidth / 2},${y + 5} L${150 + topWidth / 2},${y + 5} L${150 + bottomWidth / 2},${y + height} L${150 - bottomWidth / 2},${y + height} Z`}
                    fill={seg.color}
                    opacity={isHovered ? 1 : 0.8}
                    stroke="white"
                    strokeWidth="2"
                    style={{ transition: 'opacity 0.2s' }}
                  />
                  <text
                    x="150"
                    y={y + height / 2 + 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill={i < 2 ? 'white' : '#44403c'}
                    fontWeight="500"
                  >
                    {seg.volume}% vol → {seg.value}% value
                  </text>
                </g>
              );
            })}
            {/* GLP-1 Target Arrow */}
            <g>
              <line x1="280" y1="10" x2="280" y2="55" stroke={COLORS.glp1} strokeWidth="2" markerEnd="url(#arrowGlp)" />
              <defs>
                <marker id="arrowGlp" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill={COLORS.glp1} />
                </marker>
              </defs>
              <text x="280" y="68" textAnchor="middle" fontSize="8" fill={COLORS.glp1} fontWeight="600">GLP-1</text>
              <text x="280" y="78" textAnchor="middle" fontSize="8" fill={COLORS.glp1}>TARGET</text>
            </g>
          </svg>
        </div>
        {/* Legend */}
        <div className="flex flex-col justify-center gap-3 min-w-[200px]">
          {segments.map((seg, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-lg transition-all text-xs ${hoveredSlice === i ? 'bg-stone-100 dark:bg-stone-700/40' : ''}`}
              onMouseEnter={() => setHoveredSlice(i)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ background: seg.color }} />
                <span className="font-medium text-stone-700 dark:text-stone-300">{seg.name}</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400 ml-5 mt-0.5">
                Growing {seg.growth}/yr — {seg.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// — US Alcohol Decline Drivers —
function USDeclineDrivers() {
  const data = [
    { factor: 'GLP-1 Adoption', impact: 5.5, type: 'pharma', desc: '12.4% on GLP-1 × 44% drink less' },
    { factor: 'Gen Z Shift', impact: 4.2, type: 'cultural', desc: '3M fewer binge drinkers in a decade' },
    { factor: 'Cancer Advisory', impact: 2.5, type: 'cultural', desc: 'Surgeon General warning' },
    { factor: 'Tariff Disruption', impact: 1.8, type: 'policy', desc: 'Export disruption' },
  ];

  const getColor = (type) => {
    if (type === 'pharma') return COLORS.glp1;
    if (type === 'cultural') return '#6366f1';
    return '#78716c';
  };

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        Why US Alcohol Is Declining
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        Multi-causal decline — but only one driver is accelerating.
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" barSize={24}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.06} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#78716c' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${v}%`}
            domain={[0, 7]}
          />
          <YAxis
            dataKey="factor"
            type="category"
            tick={{ fontSize: 12, fill: '#78716c' }}
            axisLine={false}
            tickLine={false}
            width={120}
          />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.[0]) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-stone-900/95 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl shadow-2xl border border-stone-700/50 text-sm">
                <p className="font-semibold">{d.factor}</p>
                <p className="text-stone-400">~{d.impact}% of adults affected</p>
                <p className="text-stone-500 text-xs mt-1">{d.desc}</p>
              </div>
            );
          }} />
          <Bar dataKey="impact" radius={[0, 6, 6, 0]}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={getColor(entry.type)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5 text-stone-500">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.glp1 }} /> Pharmacological (accelerating)
        </span>
        <span className="flex items-center gap-1.5 text-stone-500">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#6366f1' }} /> Cultural (may plateau)
        </span>
        <span className="flex items-center gap-1.5 text-stone-500">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#78716c' }} /> Policy (reversible)
        </span>
      </div>
    </div>
  );
}

// — Drinks Per Occasion Compression —
function DrinksCompression() {
  const [glpActive, setGlpActive] = useState(false);

  const drinks = [1, 2, 3, 4, 5];
  const pricePerDrink = [500, 500, 600, 700, 800]; // escalating
  const cumPrice = pricePerDrink.reduce((acc, p, i) => {
    acc.push((acc[i - 1] || 0) + p);
    return acc;
  }, []);

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        The Per-Occasion Compression
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
        Margins concentrate in drinks 3, 4 & 5. GLP-1 suppresses exactly that transition.
      </p>
      <div className="flex items-end justify-center gap-3 h-48 mb-4">
        {drinks.map((d, i) => {
          const height = 30 + i * 25;
          const isActive = !glpActive || i < 2;
          const isMarginDrink = i >= 2;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className={`text-xs font-medium transition-all duration-500 ${isActive ? 'text-stone-600 dark:text-stone-400' : 'text-stone-300 dark:text-stone-600'}`}>
                ₹{pricePerDrink[i]}
              </span>
              <div
                className={`w-12 rounded-t-lg transition-all duration-500 relative ${
                  isActive
                    ? isMarginDrink
                      ? 'bg-amber-500'
                      : 'bg-stone-400'
                    : 'bg-stone-200 dark:bg-stone-700'
                }`}
                style={{ height: `${height}px`, opacity: isActive ? 1 : 0.3 }}
              >
                {isMarginDrink && isActive && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="text-[9px] text-amber-600 font-semibold whitespace-nowrap">MARGIN</span>
                  </div>
                )}
              </div>
              <span className={`text-xs transition-all duration-500 ${isActive ? 'text-stone-600 dark:text-stone-400' : 'text-stone-300 dark:text-stone-600'}`}>
                #{d}
              </span>
            </div>
          );
        })}
        {/* Total */}
        <div className="flex flex-col items-center gap-1 ml-4 pl-4 border-l border-stone-200 dark:border-stone-700">
          <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">Tab</span>
          <div className="flex items-center justify-center h-24">
            <span className={`text-lg font-bold transition-all duration-500 ${glpActive ? 'text-green-600' : 'text-amber-600'}`}>
              ₹{glpActive ? '1,000' : '3,100'}
            </span>
          </div>
          <span className={`text-xs transition-all duration-500 ${glpActive ? 'text-green-600' : 'text-stone-500'}`}>
            {glpActive ? '-68%' : 'per night'}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setGlpActive(!glpActive)}
          className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
            glpActive
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700'
          }`}
        >
          {glpActive ? '💊 GLP-1 Active — 2 drinks' : 'Toggle GLP-1 Effect'}
        </button>
      </div>
    </div>
  );
}

// — GLP-1 Adoption Timeline (India projection) —
function AdoptionTimeline() {
  const data = [
    { year: '2024', us: 8.0, india: 0.1 },
    { year: '2025', us: 12.4, india: 0.3 },
    { year: '2026', us: 16, india: 1.5, event: 'Patent expires\nGenerics launch' },
    { year: '2027', us: 20, india: 3.5 },
    { year: '2028', us: 23, india: 6, event: 'Oral semaglutide\nwidely available' },
    { year: '2029', us: 25, india: 9 },
    { year: '2030', us: 27, india: 12 },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        GLP-1 Adoption: US vs. India (Projected)
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        India is 18-24 months behind the US curve. Generic launch in March 2026 is the inflection point.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradUS" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradIndia" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#d97706" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.06} />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone" dataKey="us" name="US Adults on GLP-1"
            stroke="#6366f1" fill="url(#gradUS)" strokeWidth={2}
          />
          <Area
            type="monotone" dataKey="india" name="India Urban Adults (est.)"
            stroke="#d97706" fill="url(#gradIndia)" strokeWidth={2}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 8, color: '#78716c' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* Timeline events */}
      <div className="mt-2 flex justify-around text-center">
        <div className="text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-auto mb-1" />
          <p className="text-stone-500 dark:text-stone-400">Mar 2026</p>
          <p className="text-stone-700 dark:text-stone-300 font-medium">Patent Expires</p>
        </div>
        <div className="text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-auto mb-1" />
          <p className="text-stone-500 dark:text-stone-400">2028</p>
          <p className="text-stone-700 dark:text-stone-300 font-medium">Oral Tablets</p>
        </div>
        <div className="text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-auto mb-1" />
          <p className="text-stone-500 dark:text-stone-400">2029-30</p>
          <p className="text-stone-700 dark:text-stone-300 font-medium">Vanity Wave</p>
        </div>
      </div>
    </div>
  );
}

// — Demand Substitution vs Destruction —
function DemandTypes() {
  const [activeType, setActiveType] = useState('substitution');

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        Demand Substitution vs. Demand Destruction
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
        They look identical on a chart. They're not.
      </p>
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setActiveType('substitution')}
          className={`flex-1 p-4 rounded-xl border text-left transition-all ${
            activeType === 'substitution'
              ? 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20'
              : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
          }`}
        >
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Demand Substitution</p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Gin → Seedlip. Ritual stays, product changes.</p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">Cultural</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">Reversible</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">Trend-based</span>
          </div>
        </button>
        <button
          onClick={() => setActiveType('destruction')}
          className={`flex-1 p-4 rounded-xl border text-left transition-all ${
            activeType === 'destruction'
              ? 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/20'
              : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
          }`}
        >
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Demand Destruction</p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">The desire itself fades. No conscious choice.</p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">Pharmacological</span>
            <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">Persistent</span>
            <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">Neurochemical</span>
          </div>
        </button>
      </div>
      {/* Visual flow */}
      <div className={`p-4 rounded-xl transition-all ${
        activeType === 'substitution'
          ? 'bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40'
          : 'bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40'
      }`}>
        <div className="flex items-center justify-center gap-3 text-sm">
          {activeType === 'substitution' ? (
            <>
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 shadow-sm text-stone-700 dark:text-stone-300">🥃 Desire for ritual</span>
              <span className="text-stone-400">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 shadow-sm text-stone-700 dark:text-stone-300">🧊 Zero-proof option</span>
              <span className="text-stone-400">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/40 shadow-sm text-blue-700 dark:text-blue-300 font-medium">Revenue migrates</span>
            </>
          ) : (
            <>
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 shadow-sm text-stone-700 dark:text-stone-300">💊 GLP-1 modulates GABA</span>
              <span className="text-stone-400">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 shadow-sm text-stone-700 dark:text-stone-300">🧠 Reward pathway altered</span>
              <span className="text-stone-400">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 shadow-sm text-red-700 dark:text-red-300 font-medium">Revenue destroyed</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// — Main Export Component —
export default function DietPillsPegsCharts() {
  const [activeChart, setActiveChart] = useState(0);

  const charts = [
    { label: 'The Pyramid', component: <MarketPyramid /> },
    { label: 'US Signal', component: <USDeclineDrivers /> },
    { label: 'Substitution vs Destruction', component: <DemandTypes /> },
    { label: 'Drinks Compression', component: <DrinksCompression /> },
    { label: 'Adoption Timeline', component: <AdoptionTimeline /> },
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200/80 dark:border-stone-700/60 bg-white/60 dark:bg-stone-800/40 backdrop-blur-sm overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b border-stone-200/80 dark:border-stone-700/60 bg-stone-50/80 dark:bg-stone-900/40 px-2 pt-2 overflow-x-auto">
        {charts.map((chart, i) => (
          <button
            key={i}
            onClick={() => setActiveChart(i)}
            className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-all whitespace-nowrap ${
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

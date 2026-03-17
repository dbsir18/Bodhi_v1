import React, { useState, useEffect } from 'react';

// — The Scaling Dynamic: Phase 1 → Phase 2 —
function ScalingDynamic() {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setProgress(0);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (!isAnimating) return;
    if (progress >= 100) {
      setIsAnimating(false);
      return;
    }
    const timer = setTimeout(() => setProgress(p => Math.min(p + 2, 100)), 40);
    return () => clearTimeout(timer);
  }, [progress, isAnimating]);

  const phase1End = 45;
  const inPhase1 = progress <= phase1End;
  const phase2Progress = Math.max(0, (progress - phase1End) / (100 - phase1End));

  const domains = [
    { name: 'Product', icon: '📦' },
    { name: 'Fundraising', icon: '💰' },
    { name: 'Hiring', icon: '👥' },
    { name: 'Ops', icon: '⚙️' },
    { name: 'GTM', icon: '🚀' },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        The Scaling Dynamic
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
        Watch how access erodes as the company professionalizes.
      </p>

      {/* Timeline */}
      <div className="relative mb-6">
        <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: inPhase1
                ? 'linear-gradient(90deg, #d97706, #f59e0b)'
                : 'linear-gradient(90deg, #f59e0b, #78716c)',
            }}
          />
        </div>
        {/* Phase labels */}
        <div className="flex justify-between mt-2 text-xs">
          <span className={`font-medium ${inPhase1 ? 'text-amber-600' : 'text-stone-400'}`}>Phase 1: Access</span>
          <span className="text-stone-400">|</span>
          <span className={`font-medium ${!inPhase1 ? 'text-stone-600 dark:text-stone-300' : 'text-stone-400'}`}>Phase 2: Professionalization</span>
        </div>
      </div>

      {/* Domain Cards */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {domains.map((domain, i) => {
          // In phase 1, all domains glow. In phase 2, they fade one by one.
          const fadePoint = phase1End + ((100 - phase1End) / domains.length) * i;
          const isOwned = progress < fadePoint;
          const justLost = !isOwned && progress < fadePoint + 10;

          return (
            <div
              key={i}
              className={`relative p-3 rounded-xl text-center transition-all duration-500 border ${
                isOwned
                  ? 'border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-900/20'
                  : 'border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-800/40'
              }`}
            >
              <div className={`text-xl mb-1 transition-all duration-500 ${isOwned ? '' : 'grayscale opacity-40'}`}>
                {domain.icon}
              </div>
              <p className={`text-xs font-medium transition-all duration-500 ${
                isOwned ? 'text-stone-700 dark:text-stone-300' : 'text-stone-400 dark:text-stone-600'
              }`}>
                {domain.name}
              </p>
              {!isOwned && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-stone-400 dark:bg-stone-600 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">VP</span>
                </div>
              )}
              {justLost && (
                <div className="absolute inset-0 rounded-xl border-2 border-red-300 dark:border-red-700 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="text-sm">
          {progress === 0 && (
            <span className="text-stone-500 dark:text-stone-400">Press play to simulate the scaling dynamic</span>
          )}
          {progress > 0 && inPhase1 && (
            <span className="text-amber-600 dark:text-amber-400">
              Employee #4. Every room that matters has you in it.
            </span>
          )}
          {progress > phase1End && progress < 70 && (
            <span className="text-stone-600 dark:text-stone-300">
              Company raises. Specialists arrive with mandates.
            </span>
          )}
          {progress >= 70 && progress < 100 && (
            <span className="text-stone-500 dark:text-stone-400">
              Still at the company. No longer <em>of</em> it.
            </span>
          )}
          {progress >= 100 && (
            <span className="text-stone-500 dark:text-stone-400">
              The company did exactly what it was supposed to do.
            </span>
          )}
        </div>
        <button
          onClick={startAnimation}
          className="px-4 py-2 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all"
        >
          {progress === 0 ? '▶ Play' : progress >= 100 ? '↻ Replay' : '⏸ Playing...'}
        </button>
      </div>
    </div>
  );
}

// — Exposure vs Evidence Quadrant —
function ExposureVsEvidence() {
  const [hoveredQuadrant, setHoveredQuadrant] = useState(null);

  const items = [
    { label: 'Strategy meetings', x: 20, y: 80, type: 'exposure' },
    { label: 'Founder conversations', x: 25, y: 70, type: 'exposure' },
    { label: 'Investor calls', x: 35, y: 75, type: 'exposure' },
    { label: 'Hiring debriefs', x: 30, y: 60, type: 'exposure' },
    { label: 'Board dinners', x: 15, y: 85, type: 'exposure' },
    { label: 'Lead-scoring tool', x: 75, y: 25, type: 'evidence' },
    { label: 'Hiring tracker', x: 70, y: 35, type: 'evidence' },
    { label: 'Fundraise model', x: 80, y: 20, type: 'evidence' },
    { label: 'Automation (4hr→20min)', x: 85, y: 30, type: 'evidence' },
    { label: 'Side project shipped', x: 90, y: 15, type: 'evidence' },
    { label: 'Product launches owned', x: 65, y: 65, type: 'both' },
    { label: 'Revenue model built', x: 70, y: 60, type: 'both' },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        Exposure vs. Evidence
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
        Exposure is interesting at a dinner party. Evidence is hireable.
      </p>
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {/* Quadrant backgrounds */}
          <rect x="40" y="20" width="175" height="125" fill="#fef3c7" fillOpacity="0.3" rx="4" />
          <rect x="215" y="20" width="175" height="125" fill="#d1fae5" fillOpacity="0.3" rx="4" />
          <rect x="40" y="145" width="175" height="125" fill="#fee2e2" fillOpacity="0.15" rx="4" />
          <rect x="215" y="145" width="175" height="125" fill="#fef3c7" fillOpacity="0.15" rx="4" />

          {/* Axes */}
          <line x1="40" y1="270" x2="390" y2="270" stroke="currentColor" strokeOpacity="0.15" />
          <line x1="40" y1="20" x2="40" y2="270" stroke="currentColor" strokeOpacity="0.15" />

          {/* Labels */}
          <text x="215" y="292" textAnchor="middle" fontSize="11" className="fill-stone-500">Evidence (things built, shipped, measurable) →</text>
          <text x="12" y="145" textAnchor="middle" fontSize="11" className="fill-stone-500" transform="rotate(-90, 12, 145)">Exposure (access, conversations, meetings) →</text>

          {/* Quadrant labels */}
          <text x="127" y="38" textAnchor="middle" fontSize="9" className="fill-amber-600 dark:fill-amber-400" fontWeight="600">HIGH EXPOSURE</text>
          <text x="127" y="48" textAnchor="middle" fontSize="9" className="fill-amber-600 dark:fill-amber-400" fontWeight="600">LOW EVIDENCE</text>
          <text x="302" y="38" textAnchor="middle" fontSize="9" className="fill-green-600 dark:fill-green-400" fontWeight="600">HIGH BOTH</text>
          <text x="302" y="48" textAnchor="middle" fontSize="9" className="fill-green-600 dark:fill-green-400" fontWeight="600">= NEXT MOVE</text>

          {/* Data points */}
          {items.map((item, i) => {
            const cx = 40 + (item.x / 100) * 350;
            const cy = 270 - (item.y / 100) * 250;
            const color = item.type === 'exposure'
              ? '#d97706'
              : item.type === 'evidence'
                ? '#059669'
                : '#6366f1';

            return (
              <g key={i} style={{ cursor: 'pointer' }}>
                <circle
                  cx={cx} cy={cy} r="5"
                  fill={color}
                  opacity={0.8}
                />
                <title>{item.label}</title>
                {/* Show labels on hover via CSS :hover would be ideal, but using title for simplicity */}
                <text
                  x={cx}
                  y={cy - 10}
                  textAnchor="middle"
                  fontSize="8"
                  className="fill-stone-600 dark:fill-stone-400"
                  opacity={0.8}
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Arrow showing journey */}
          <defs>
            <marker id="arrowJourney" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#6366f1" />
            </marker>
          </defs>
          <path
            d="M130,80 C180,80 220,120 300,60"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#arrowJourney)"
            opacity="0.5"
          />
          <text x="220" y="95" textAnchor="middle" fontSize="8" className="fill-indigo-500" fontStyle="italic">your journey →</text>
        </svg>
      </div>
      <div className="mt-2 flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Exposure only
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-600" /> Evidence (hireable)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Both (unlocks next move)
        </span>
      </div>
    </div>
  );
}

// — Breadth vs Depth over Time —
function BreadthVsDepth() {
  const [activeProfile, setActiveProfile] = useState('early_cos');

  const profiles = {
    early_cos: {
      label: 'Early-Career CoS',
      desc: 'Breadth first, depth later. The inversion.',
      skills: [
        { name: 'Product', level: 45 },
        { name: 'Finance', level: 40 },
        { name: 'Ops', level: 50 },
        { name: 'Hiring', level: 35 },
        { name: 'GTM', level: 40 },
        { name: 'Engineering', level: 20 },
      ],
      color: '#d97706',
    },
    specialist: {
      label: 'Specialist (3yr PM)',
      desc: 'Deep spike, narrow range. Known for something.',
      skills: [
        { name: 'Product', level: 90 },
        { name: 'Finance', level: 15 },
        { name: 'Ops', level: 20 },
        { name: 'Hiring', level: 25 },
        { name: 'GTM', level: 30 },
        { name: 'Engineering', level: 35 },
      ],
      color: '#2563eb',
    },
    smart_cos: {
      label: 'Smart CoS (bet placed)',
      desc: 'Breadth + intentional spike. The best outcome.',
      skills: [
        { name: 'Product', level: 75 },
        { name: 'Finance', level: 45 },
        { name: 'Ops', level: 55 },
        { name: 'Hiring', level: 40 },
        { name: 'GTM', level: 50 },
        { name: 'Engineering', level: 30 },
      ],
      color: '#059669',
    },
  };

  const active = profiles[activeProfile];

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-1">
        Breadth vs. Depth: Three Profiles
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
        The CoS who places a bet before Phase 2 forces one on them.
      </p>

      {/* Profile Selector */}
      <div className="flex gap-2 mb-6">
        {Object.entries(profiles).map(([key, profile]) => (
          <button
            key={key}
            onClick={() => setActiveProfile(key)}
            className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-medium transition-all border ${
              activeProfile === key
                ? 'shadow-sm'
                : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
            style={activeProfile === key ? {
              borderColor: profile.color + '60',
              backgroundColor: profile.color + '10',
              color: profile.color,
            } : {}}
          >
            {profile.label}
          </button>
        ))}
      </div>

      {/* Skill Bars */}
      <div className="space-y-3">
        {active.skills.map((skill, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-stone-600 dark:text-stone-400 w-20 text-right">{skill.name}</span>
            <div className="flex-1 h-5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: active.color,
                  opacity: 0.8,
                }}
              />
              {/* Threshold line for "known for something" */}
              <div className="absolute top-0 bottom-0 left-[70%] w-px border-l border-dashed border-stone-400/40" />
            </div>
            <span className="text-xs text-stone-400 w-8">{skill.level}%</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-stone-500 dark:text-stone-400 italic">{active.desc}</p>
        <div className="flex items-center gap-1 text-[10px] text-stone-400">
          <div className="w-px h-3 border-l border-dashed border-stone-400" />
          <span>"known for something" threshold</span>
        </div>
      </div>
    </div>
  );
}

// — Main Export Component —
export default function ChiefOfStaffCharts() {
  const [activeChart, setActiveChart] = useState(0);

  const charts = [
    { label: 'Scaling Dynamic', component: <ScalingDynamic /> },
    { label: 'Exposure vs Evidence', component: <ExposureVsEvidence /> },
    { label: 'Breadth vs Depth', component: <BreadthVsDepth /> },
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

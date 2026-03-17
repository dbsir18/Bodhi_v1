import React, { useState } from 'react';
import ExportCultureCharts from './ExportCultureCharts';
import DietPillsPegsCharts from './DietPillsPegsCharts';
import ChiefOfStaffCharts from './ChiefOfStaffCharts';

/**
 * Preview component for all article charts.
 *
 * Usage: temporarily render this in your app to preview all charts:
 *   import ChartsPreview from './components/charts/ChartsPreview';
 *   <ChartsPreview />
 *
 * For production, import individual chart components into the article views:
 *   import ExportCultureCharts from './components/charts/ExportCultureCharts';
 *   import DietPillsPegsCharts from './components/charts/DietPillsPegsCharts';
 *   import ChiefOfStaffCharts from './components/charts/ChiefOfStaffCharts';
 */
export default function ChartsPreview() {
  const [activeArticle, setActiveArticle] = useState(0);

  const articles = [
    { title: 'Export Your Culture', subtitle: 'Thoughts', component: <ExportCultureCharts /> },
    { title: 'Diet Pills & Pegs', subtitle: 'Thoughts', component: <DietPillsPegsCharts /> },
    { title: 'The Chief of Staff Equation', subtitle: 'Learnings', component: <ChiefOfStaffCharts /> },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">Article Charts Preview</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Interactive visualizations for each article. Click to switch articles.
      </p>

      {/* Article Selector */}
      <div className="flex gap-2 mb-8">
        {articles.map((article, i) => (
          <button
            key={i}
            onClick={() => setActiveArticle(i)}
            className={`flex-1 p-3 rounded-xl text-left transition-all border ${
              activeArticle === i
                ? 'border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-900/20 shadow-sm'
                : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
            }`}
          >
            <p className="text-[10px] uppercase tracking-wider text-stone-400">{article.subtitle}</p>
            <p className={`text-sm font-semibold mt-0.5 ${
              activeArticle === i ? 'text-amber-700 dark:text-amber-400' : 'text-stone-700 dark:text-stone-300'
            }`}>{article.title}</p>
          </button>
        ))}
      </div>

      {/* Chart */}
      {articles[activeArticle].component}
    </div>
  );
}

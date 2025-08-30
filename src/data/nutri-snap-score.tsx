"use client";

import React, { useMemo } from 'react';

// Define the structure of the score data prop, same as the line chart
interface ScoreData {
  score: number;
  date: { seconds: number; nanoseconds: number; };
}

interface ScorePieChartProps {
  data: ScoreData[];
}

// Define categories for score ranges
const SCORE_CATEGORIES = {
  EXCELLENT: { name: 'Excellent', range: [75, 100], color: '#22c55e' }, // Green-500
  GOOD: { name: 'Good', range: [50, 74], color: '#3b82f6' },        // Blue-500
  AVERAGE: { name: 'Average', range: [25, 49], color: '#f59e0b' },      // Amber-500
  IMPROVEMENT: { name: 'Needs Improvement', range: [0, 24], color: '#ef4444' },// Red-500
};

/**
 * A component to visualize the distribution of scores using a pie chart.
 * It categorizes scores and displays the percentage of entries in each category.
 * @param {ScorePieChartProps} props - The component props.
 * @returns A responsive pie chart or a placeholder if there is no data.
 */
const ScorePieChart: React.FC<ScorePieChartProps> = ({ data }) => {
  const avgScore = useMemo(() => {
    if (!data || data.length === 0) return 0;
    const total = data.reduce((sum, item) => sum + (item.score ?? 0), 0);
    return Math.round(total / data.length);
  }, [data]);

  const getCategoryByScore = (score: number) => {
    if (score >= SCORE_CATEGORIES.EXCELLENT.range[0]) return SCORE_CATEGORIES.EXCELLENT.name;
    if (score >= SCORE_CATEGORIES.GOOD.range[0]) return SCORE_CATEGORIES.GOOD.name;
    if (score >= SCORE_CATEGORIES.AVERAGE.range[0]) return SCORE_CATEGORIES.AVERAGE.name;
    return SCORE_CATEGORIES.IMPROVEMENT.name;
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50 rounded-lg p-4 text-center">
        <p className="text-slate-500">
          No scores yet. Add a score to see your health distribution.
        </p>
      </div>
    );
  }

  // Wheel (radial) dimensions
  const size = 220;
  const strokeWidth = 16;
  // Subtract a few pixels to keep rounded stroke caps fully inside the viewbox
  const capPadding = 3;
  const radius = (size - strokeWidth) / 2 - capPadding;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, avgScore)) / 100;
  const dashArray = `${progress * circumference} ${circumference}`;
  const center = size / 2;
  const green = SCORE_CATEGORIES.EXCELLENT.color; // green progress

  // Create tick marks for comic "wheel" feel
  const ticks = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <div className="relative rounded-xl border-[3px] border-black bg-white shadow-[6px_6px_0_0_#111] p-4 overflow-hidden">
      {/* Halftone dots background */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '6px 6px',
        }}
      />

      <div className="relative z-10 grid place-items-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <filter id="comicShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="3" stdDeviation="0" floodColor="#111111" floodOpacity="1" />
            </filter>
          </defs>

          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            filter="url(#comicShadow)"
          />

          {/* Progress (rotated to start at top) */}
          <g transform={`rotate(-90 ${center} ${center})`}>
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={green}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeLinecap="round"
            />
          </g>

          {/* Tick marks */}
          {ticks.map((t) => {
            const angle = (t / ticks.length) * 360;
            const length = 8;
            const innerR = radius - strokeWidth / 2 - 6;
            const outerR = innerR + length;
            const rad = (angle - 90) * (Math.PI / 180);
            const x1 = center + innerR * Math.cos(rad);
            const y1 = center + innerR * Math.sin(rad);
            const x2 = center + outerR * Math.cos(rad);
            const y2 = center + outerR * Math.sin(rad);
            return (
              <line
                key={t}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#111111"
                strokeWidth={2}
                strokeLinecap="round"
                opacity={0.7}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute text-center">
          <div className="text-5xl font-extrabold leading-none tracking-tight">{avgScore}</div>
          <div className="mt-1 text-xs uppercase tracking-wide text-black/70 font-semibold">Score</div>
          <div className="mt-2">
            <span className="inline-block bg-yellow-200 border-[2px] border-black rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide shadow-[3px_3px_0_0_#111]">
              {getCategoryByScore(avgScore)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePieChart;


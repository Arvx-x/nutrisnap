import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  
  const pieData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    const categoryCounts = {
      Excellent: 0,
      Good: 0,
      Average: 0,
      'Needs Improvement': 0,
    };

    data.forEach(item => {
      const { score } = item;
      if (score >= SCORE_CATEGORIES.EXCELLENT.range[0]) {
        categoryCounts.Excellent++;
      } else if (score >= SCORE_CATEGORIES.GOOD.range[0]) {
        categoryCounts.Good++;
      } else if (score >= SCORE_CATEGORIES.AVERAGE.range[0]) {
        categoryCounts.Average++;
      } else {
        categoryCounts['Needs Improvement']++;
      }
    });

    return Object.entries(categoryCounts)
      .map(([name, value]) => ({ name, value }))
      .filter(entry => entry.value > 0); // Only show categories with data

  }, [data]);

  const COLORS = [
      SCORE_CATEGORIES.EXCELLENT.color, 
      SCORE_CATEGORIES.GOOD.color, 
      SCORE_CATEGORIES.AVERAGE.color, 
      SCORE_CATEGORIES.IMPROVEMENT.color
  ];

  if (pieData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50 rounded-lg p-4 text-center">
        <p className="text-slate-500">
          No scores yet. Add a score to see your health distribution.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => {
            // Helper to get color by category name
            const getColorByName = (name: string) => {
              const key = Object.keys(SCORE_CATEGORIES).find(
                k => SCORE_CATEGORIES[k as keyof typeof SCORE_CATEGORIES].name === name
              );
              return key ? SCORE_CATEGORIES[key as keyof typeof SCORE_CATEGORIES].color : '#8884d8';
            };
            return (
              <Cell key={`cell-${index}`} fill={getColorByName(entry.name)} />
            );
          })}
        </Pie>
        <Tooltip
            contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ccc',
                borderRadius: '0.5rem',
            }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ScorePieChart;


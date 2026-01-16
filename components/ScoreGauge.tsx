import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const data = [
    {
      name: 'Score',
      value: score,
      fill: score > 75 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444',
    },
  ];

  const getColor = (s: number) => {
    if (s >= 80) return 'text-emerald-500';
    if (s >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getLabel = (s: number) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={20}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-8 pointer-events-none">
        <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Carbon Score</span>
        <span className={`text-6xl font-bold ${getColor(score)}`}>{score}</span>
        <span className={`text-lg font-medium mt-1 ${getColor(score)}`}>{getLabel(score)}</span>
      </div>
    </div>
  );
};

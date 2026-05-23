import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Utilization',
    uv: 75,
    fill: 'url(#gradient)',
  }
];

const UtilizationChart: React.FC = () => {
  return (
    <div className="bg-formBg rounded-xl p-6 border border-slate-800 h-full flex flex-col items-center justify-between text-center relative shadow-2xl">
      <h2 className="text-purple-200 font-medium mt-2">Fleet Utilization</h2>
      
      <div className="w-full h-48 relative my-4 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="75%" 
            outerRadius="90%" 
            barSize={15} 
            data={data} 
            startAngle={90} 
            endAngle={-270}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e879f9" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            {/* Background circle track */}
            <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#334155" strokeWidth="15" />
            <RadialBar
              background={{ fill: '#1e293b' }}
              dataKey="uv"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
          <span className="text-2xl font-bold text-white">75%</span>
          <span className="text-xs text-slate-400 font-mono tracking-tight">Active Now</span>
        </div>
        {/* Glow effect underneath */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 blur-2xl rounded-full pointer-events-none"></div>
      </div>

      <p className="text-xs text-slate-400 mb-2 leading-relaxed px-4">
        Maximum operational efficiency achieved in European sectors.
      </p>
    </div>
  );
};

export default UtilizationChart;

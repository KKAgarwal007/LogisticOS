import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const dailyData = [
  { name: 'MON', value: 12 },
  { name: 'TUE', value: 19 },
  { name: 'WED', value: 15 },
  { name: 'THU', value: 25 },
  { name: 'FRI', value: 22 },
  { name: 'SAT', value: 30 },
  { name: 'SUN', value: 10 }
];

const weeklyData = [
  { name: 'W1', value: 120 },
  { name: 'W2', value: 140 },
  { name: 'W3', value: 110 },
  { name: 'W4', value: 180 },
  { name: 'W5', value: 160 },
  { name: 'W6', value: 210 },
  { name: 'W7', value: 190 },
  { name: 'W8', value: 230 }
];

const VolumeChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const currentData = viewMode === 'daily' ? dailyData : weeklyData;

  return (
    <div className="bg-formBg rounded-xl p-6 border border-slate-800 h-full flex flex-col relative overflow-hidden shadow-2xl">
      <div className="flex justify-between items-start z-10">
        <div>
          <h2 className="text-primary font-medium">Shipment Volume</h2>
          <p className="text-slate-400 text-xs mt-1">Global throughput across all regions</p>
        </div>
        <div className="flex bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
          <button 
            onClick={() => setViewMode('daily')}
            className={`px-3 py-1 text-xs transition-colors ${viewMode === 'daily' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setViewMode('weekly')}
            className={`px-3 py-1 text-xs transition-colors ${viewMode === 'weekly' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="flex-1 mt-8 z-10 w-[110%] -ml-[5%]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#06b6d4" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              style={{ filter: "drop-shadow(0px 4px 10px rgba(6, 182, 212, 0.4))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Custom X-axis labels to match the smooth continuous curve feel */}
      <div className="flex justify-between px-8 pb-2 text-[10px] text-slate-500 font-mono font-medium z-10 opacity-70">
        {currentData.map(d => (
          <span key={d.name}>{d.name}</span>
        ))}
      </div>
    </div>
  );
};

export default VolumeChart;

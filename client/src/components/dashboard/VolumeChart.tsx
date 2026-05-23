import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'JAN', value: 30 },
  { name: 'FEB', value: 40 },
  { name: 'MAR', value: 80 },
  { name: 'APR', value: 50 },
  { name: 'MAY', value: 120 },
  { name: 'JUN', value: 40 },
  { name: 'JUL', value: 150 },
  { name: 'AUG', value: 60 },
  { name: 'SEP', value: 140 }
];

const VolumeChart: React.FC = () => {
  return (
    <div className="bg-formBg rounded-xl p-6 border border-slate-800 h-full flex flex-col relative overflow-hidden shadow-2xl">
      <div className="flex justify-between items-start z-10">
        <div>
          <h2 className="text-primary font-medium">Shipment Volume</h2>
          <p className="text-slate-400 text-xs mt-1">Global throughput across all regions</p>
        </div>
        <div className="flex bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
          <button className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors">Daily</button>
          <button className="px-3 py-1 text-xs bg-slate-700 text-white font-medium">Monthly</button>
        </div>
      </div>

      <div className="flex-1 mt-8 z-10 w-[110%] -ml-[5%]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
        <span>JAN</span>
        <span>FEB</span>
        <span>MAR</span>
        <span>APR</span>
        <span>MAY</span>
        <span>JUN</span>
        <span>JUL</span>
        <span>AUG</span>
      </div>
    </div>
  );
};

export default VolumeChart;

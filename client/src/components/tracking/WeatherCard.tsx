import React from 'react';
import { CloudRain } from 'lucide-react';

const WeatherCard: React.FC = () => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 h-full flex flex-col shadow-lg">
      <div className="flex justify-between items-start mb-10">
        <h3 className="text-xs font-mono text-slate-400 font-bold tracking-widest uppercase">Local Weather</h3>
        <CloudRain className="w-5 h-5 text-slate-300" />
      </div>

      <div className="flex items-baseline space-x-3 mb-6">
        <span className="text-5xl font-light text-white">24°</span>
        <span className="text-sm font-bold text-emerald-400 max-w-[100px] leading-tight">Heavy Rain Expected</span>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">
        Precautions advised for Sector B. Visibility reduced to 2km.
      </p>

      <div className="mt-auto">
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <div className="w-1/2 bg-cyan-400 h-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

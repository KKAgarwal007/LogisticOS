import React from 'react';
import { Thermometer, Gauge, BatteryCharging } from 'lucide-react';

const TelemetryMiniCards: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 flex items-center space-x-4 flex-1 shadow-lg">
        <div className="w-10 h-10 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-400">
          <Thermometer className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase mb-1">Cargo Temp</p>
          <p className="text-2xl font-light text-white">4.2<span className="text-sm ml-1">°C</span></p>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 flex items-center space-x-4 flex-1 shadow-lg">
        <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center text-cyan-400">
          <Gauge className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase mb-1">Vehicle Speed</p>
          <p className="text-2xl font-light text-white">78<span className="text-sm text-slate-400 ml-1">km/h</span></p>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 flex items-center space-x-4 flex-1 shadow-lg">
        <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center text-purple-400">
          <BatteryCharging className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase mb-1">EV Reserve</p>
          <p className="text-2xl font-light text-white">84%</p>
        </div>
      </div>
    </div>
  );
};

export default TelemetryMiniCards;

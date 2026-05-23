import React from 'react';

const TelemetryFeed: React.FC = () => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-8 w-full shadow-lg">
      <h3 className="text-xs font-mono text-slate-400 font-bold tracking-widest uppercase mb-8">
        Real-Time Telemetry Feed
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <h4 className="text-[10px] font-mono text-slate-500 tracking-widest mb-2">G-Force</h4>
          <p className="text-lg font-bold text-white font-mono tracking-wider">1.02 G</p>
        </div>
        <div>
          <h4 className="text-[10px] font-mono text-slate-500 tracking-widest mb-2">Brake Health</h4>
          <p className="text-lg font-bold text-emerald-400 font-mono tracking-wider">98%</p>
        </div>
        <div>
          <h4 className="text-[10px] font-mono text-slate-500 tracking-widest mb-2">Sat Signal</h4>
          <p className="text-lg font-bold text-cyan-400 font-mono tracking-wider">Stable <span className="text-sm font-normal text-slate-400">(5/5)</span></p>
        </div>
        <div>
          <h4 className="text-[10px] font-mono text-slate-500 tracking-widest mb-2">Last Ping</h4>
          <p className="text-lg font-bold text-white font-mono tracking-wider">0.4s ago</p>
        </div>
      </div>
    </div>
  );
};

export default TelemetryFeed;

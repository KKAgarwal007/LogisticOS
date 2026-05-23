import React from 'react';

const VehicleMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-6 h-full">
      <div className="bg-formBg rounded-xl p-5 border border-slate-800 flex flex-col justify-center">
        <h3 className="text-xs font-mono text-slate-400 font-bold tracking-widest mb-4">TOTAL<br/>FLEET</h3>
        <p className="text-3xl text-primary font-light">124</p>
      </div>

      <div className="bg-formBg rounded-xl p-5 border border-slate-800 flex flex-col justify-center shadow-[0_0_15px_rgba(52,211,153,0.05)] border-t-emerald-500/20">
        <h3 className="text-xs font-mono text-slate-400 font-bold tracking-widest mb-4">ACTIVE<br/>UNITS</h3>
        <div className="flex items-center space-x-3">
          <p className="text-3xl text-emerald-400 font-light">92</p>
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold">74%</span>
        </div>
      </div>

      <div className="bg-formBg rounded-xl p-5 border border-slate-800 flex flex-col justify-center">
        <h3 className="text-xs font-mono text-slate-400 font-bold tracking-widest mb-4">AVG<br/>EFFICIENCY</h3>
        <p className="text-3xl text-slate-300 font-light">8.4 <span className="text-sm text-slate-500 ml-1">km/l</span></p>
      </div>

      <div className="bg-formBg rounded-xl p-5 border border-slate-800 flex flex-col justify-center">
        <h3 className="text-xs font-mono text-slate-400 font-bold tracking-widest mb-4">PENDING<br/>MAINT.</h3>
        <p className="text-3xl text-red-400 font-light">8</p>
      </div>
    </div>
  );
};

export default VehicleMetrics;

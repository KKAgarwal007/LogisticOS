import React from 'react';
import { Map, Edit2, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

const VehicleTelemetry: React.FC = () => {
  return (
    <div className="bg-formBg rounded-xl p-8 border border-slate-800 shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-slate-300 font-mono text-sm tracking-widest mb-1">VX-8802</h2>
          <h1 className="text-white font-mono tracking-widest font-bold">ACTIVE TELEMETRY</h1>
        </div>
        <div className="flex space-x-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-800/50 text-slate-400 hover:text-white transition-colors border border-slate-700">
            <Map className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-800/50 text-slate-400 hover:text-white transition-colors border border-slate-700">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8 border border-slate-700 shadow-lg group">
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-slate-700/50 rounded-full px-3 py-1 flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-white tracking-widest uppercase">Live Feed</span>
        </div>
        <img 
          src="/live_truck_feed.png" 
          alt="Live Truck Feed" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xs font-mono text-slate-400 tracking-widest mb-2 font-bold uppercase">Vehicle Class</h3>
          <p className="text-white font-bold text-sm">Heavy Duty</p>
        </div>
        <div>
          <h3 className="text-xs font-mono text-slate-400 tracking-widest mb-2 font-bold uppercase">Current Status</h3>
          <p className="text-primary font-bold text-sm uppercase tracking-wider">In Transit</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-xs font-mono text-slate-400 tracking-widest font-bold uppercase">Payload Utilization</h3>
          <p className="text-white font-bold font-mono tracking-wider">24.5 / 25T</p>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
          <div className="bg-gradient-to-r from-primary to-cyan-300 h-full rounded-full" style={{ width: '98%' }}></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 flex flex-col items-center justify-center text-center">
          <RefreshCw className="w-5 h-5 text-slate-400 mb-2" />
          <h4 className="text-[10px] font-mono text-slate-500 tracking-widest font-bold uppercase mb-1">Last Sync</h4>
          <p className="text-white text-sm">2 mins ago</p>
        </div>
        <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
          <h4 className="text-[10px] font-mono text-slate-500 tracking-widest font-bold uppercase mb-1">System Check</h4>
          <p className="text-emerald-400 text-sm">Optimal</p>
        </div>
      </div>

      <button className="mt-auto w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 rounded-xl py-4 font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] group">
        <span>View Full Telematics</span>
        <ArrowRight className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default VehicleTelemetry;

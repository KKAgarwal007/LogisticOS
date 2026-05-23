import React from 'react';
import { Check, Truck, Radio, RadioReceiver, MapPin, Video } from 'lucide-react';

const TrackingSidebar: React.FC = () => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 w-full max-w-sm h-full flex flex-col shadow-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">TRK-2940-LX</h1>
          <p className="text-sm text-slate-400">Global Express | Priority Alpha</p>
        </div>
        <span className="bg-slate-800 border border-slate-700 text-cyan-400 text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase">
          In Transit
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h3 className="text-xs font-mono text-slate-500 font-bold tracking-widest uppercase mb-2">ETA</h3>
          <p className="text-2xl font-light text-white">14:42 <span className="text-sm text-emerald-400 font-bold tracking-normal">(-4m)</span></p>
        </div>
        <div>
          <h3 className="text-xs font-mono text-slate-500 font-bold tracking-widest uppercase mb-2">Dist. Rem.</h3>
          <p className="text-2xl font-light text-white">12.4 <span className="text-sm text-slate-400">km</span></p>
        </div>
      </div>

      <div className="flex-1 relative mb-8 mt-4 pl-4">
        {/* Vertical Line connecting nodes */}
        <div className="absolute left-[31px] top-4 bottom-8 w-0.5 bg-slate-800"></div>

        <div className="space-y-8 relative">
          {/* Node 1 */}
          <div className="flex items-start group">
            <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30 text-cyan-400 z-10 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Check className="w-4 h-4" />
            </div>
            <div className="ml-4 pt-1">
              <h4 className="text-sm font-bold text-slate-200">Departed Hub CN-04</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Today, 08:30 AM</p>
            </div>
          </div>

          {/* Node 2 */}
          <div className="flex items-start group">
            <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30 text-cyan-400 z-10 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Truck className="w-4 h-4" />
            </div>
            <div className="ml-4 pt-1">
              <h4 className="text-sm font-bold text-slate-200">Arrived Customs Node</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Today, 11:15 AM</p>
            </div>
          </div>

          {/* Node 3 (Active) */}
          <div className="flex items-start group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-cyan-400 z-10 shrink-0 relative shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-slate-900">
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
            </div>
            <div className="ml-4 pt-1">
              <h4 className="text-sm font-bold text-cyan-400">Transit: Zone 7 Sector B</h4>
              <p className="text-xs text-slate-400 font-mono mt-1 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse mr-2"></span>
                Last Update: 1 min ago
              </p>
            </div>
          </div>

          {/* Node 4 (Future) */}
          <div className="flex items-start group">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 z-10 shrink-0 opacity-50">
              <MapPin className="w-4 h-4 text-slate-500" />
            </div>
            <div className="ml-4 pt-1 opacity-50">
              <h4 className="text-sm font-bold text-slate-400">Delivery Endpoint</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Estimated 14:42 PM</p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 rounded-xl py-4 font-bold transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] mt-auto">
        <Video className="w-5 h-5 opacity-80" />
        <span>Live Camera Feed</span>
      </button>
    </div>
  );
};

export default TrackingSidebar;

import React from 'react';
import { AlertTriangle, Clock, Info } from 'lucide-react';

const PriorityAlerts: React.FC = () => {
  return (
    <div className="bg-formBg rounded-xl border border-slate-800 p-6 shadow-xl h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-red-400">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="text-xs font-mono font-bold tracking-widest uppercase">Priority Alerts</h2>
        </div>
        <span className="bg-red-900/50 text-red-300 text-[10px] px-2 py-0.5 rounded font-bold font-mono border border-red-500/30 shadow-[0_0_8px_rgba(248,113,113,0.2)]">
          2 NEW
        </span>
      </div>

      <div className="space-y-4">
        {/* Alert 1 */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4 relative overflow-hidden group hover:border-red-500/50 transition-colors">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
          <div className="flex items-start space-x-3 ml-2">
            <Clock className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-red-300 font-bold text-sm mb-1">Delayed Departure</h3>
              <p className="text-slate-400 text-xs mb-3 leading-snug">TK-902 delayed 2hrs at Port.</p>
              <span className="text-[9px] font-mono font-bold text-slate-500 tracking-widest uppercase">2 Mins Ago</span>
            </div>
          </div>
        </div>

        {/* Alert 2 */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"></div>
          <div className="flex items-start space-x-3 ml-2">
            <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-cyan-300 font-bold text-sm mb-1">Weather Warning</h3>
              <p className="text-slate-400 text-xs mb-3 leading-snug">High winds at North Ridge Pass.</p>
              <span className="text-[9px] font-mono font-bold text-slate-500 tracking-widest uppercase">1 Hour Ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityAlerts;

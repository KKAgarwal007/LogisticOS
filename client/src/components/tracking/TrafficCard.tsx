import React from 'react';
import { TrafficCone } from 'lucide-react';

const TrafficCard: React.FC = () => {
  return (
    <div className="relative rounded-xl border border-slate-700/50 overflow-hidden h-full flex flex-col shadow-lg group">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/traffic_bg.png" 
          alt="Traffic Status Background" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <h3 className="text-xs font-mono text-slate-300 font-bold tracking-widest uppercase">Traffic Status</h3>
          <TrafficCone className="w-5 h-5 text-red-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white leading-tight mb-3">Moderate<br/>Congestion</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Congestion detected near Exit 14. AI rerouting suggested <span className="text-white font-bold">(+6 mins)</span>.
          </p>
          
          <button className="bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-mono font-bold tracking-widest uppercase px-6 py-2.5 rounded-lg hover:bg-slate-700 hover:text-white transition-all">
            Apply Auto-Reroute
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrafficCard;

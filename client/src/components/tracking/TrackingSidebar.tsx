import React from 'react';
import { Check, Truck, Radio, RadioReceiver, MapPin, Video, Search } from 'lucide-react';

interface TrackingSidebarProps {
  shipment?: any;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

const TrackingSidebar: React.FC<TrackingSidebarProps> = ({ shipment, searchQuery, onSearchChange }) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 w-full max-w-sm h-full flex flex-col shadow-2xl">
      
      {/* Mobile Search Bar */}
      <div className="block sm:hidden mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          value={searchQuery || ''}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Trace Shipment ID..."
          className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all"
        />
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            {shipment ? shipment.trackingId : (searchQuery ? 'NOT FOUND' : 'TRK-2940-LX')}
          </h1>
          <p className="text-sm text-slate-400">
            {shipment ? shipment.title : 'Global Express | Priority Alpha'}
          </p>
        </div>
        <span className={`bg-slate-800 border text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase ${
          shipment?.columnId === 'delivered' ? 'text-emerald-400 border-emerald-500/50' :
          shipment?.columnId === 'in_transit' ? 'text-cyan-400 border-cyan-500/50' :
          shipment?.columnId === 'scheduled' ? 'text-purple-400 border-purple-500/50' :
          'text-slate-400 border-slate-500/50'
        }`}>
          {shipment ? shipment.columnId.replace('_', ' ') : 'In Transit'}
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 ${
              shipment ? 'bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'bg-slate-800 border border-slate-700 text-slate-500'
            }`}>
              <Check className="w-4 h-4" />
            </div>
            <div className={`ml-4 pt-1 ${!shipment && 'opacity-50'}`}>
              <h4 className={`text-sm font-bold ${shipment ? 'text-slate-200' : 'text-slate-400'}`}>Pending Dispatch</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Origin: {shipment?.origin || 'Unknown'}</p>
            </div>
          </div>

          {/* Node 2 */}
          <div className="flex items-start group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 ${
              shipment && ['scheduled', 'in_transit', 'delivered'].includes(shipment.columnId) ? 'bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'bg-slate-800 border border-slate-700 text-slate-500'
            }`}>
              <Radio className="w-4 h-4" />
            </div>
            <div className={`ml-4 pt-1 ${!(shipment && ['scheduled', 'in_transit', 'delivered'].includes(shipment.columnId)) && 'opacity-50'}`}>
              <h4 className={`text-sm font-bold ${shipment && ['scheduled', 'in_transit', 'delivered'].includes(shipment.columnId) ? 'text-slate-200' : 'text-slate-400'}`}>Scheduled</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Carrier Assigned</p>
            </div>
          </div>

          {/* Node 3 */}
          <div className="flex items-start group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 ${
              shipment && ['in_transit', 'delivered'].includes(shipment.columnId) ? (shipment.columnId === 'in_transit' ? 'border-2 border-cyan-400 relative shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-slate-900' : 'bg-cyan-900/30 border border-cyan-500/30 text-cyan-400') : 'bg-slate-800 border border-slate-700 text-slate-500'
            }`}>
              {shipment?.columnId === 'in_transit' ? <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div> : <Truck className="w-4 h-4" />}
            </div>
            <div className={`ml-4 pt-1 ${!(shipment && ['in_transit', 'delivered'].includes(shipment.columnId)) && 'opacity-50'}`}>
              <h4 className={`text-sm font-bold ${shipment?.columnId === 'in_transit' ? 'text-cyan-400' : shipment?.columnId === 'delivered' ? 'text-slate-200' : 'text-slate-400'}`}>In Transit</h4>
              {shipment?.columnId === 'in_transit' && (
                <p className="text-xs text-slate-400 font-mono mt-1 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse mr-2"></span>
                  Moving
                </p>
              )}
            </div>
          </div>

          {/* Node 4 (Future) */}
          <div className="flex items-start group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 ${
              shipment?.columnId === 'delivered' ? 'bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.2)]' : 'bg-slate-800 border border-slate-700 text-slate-500 opacity-50'
            }`}>
              <MapPin className="w-4 h-4" />
            </div>
            <div className={`ml-4 pt-1 ${shipment?.columnId !== 'delivered' && 'opacity-50'}`}>
              <h4 className={`text-sm font-bold ${shipment?.columnId === 'delivered' ? 'text-emerald-400' : 'text-slate-400'}`}>Delivery Endpoint</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Dest: {shipment?.destination || 'Unknown'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingSidebar;

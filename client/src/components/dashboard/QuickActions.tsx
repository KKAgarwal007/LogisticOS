import React from 'react';
import { PlusSquare, UserPlus, Map } from 'lucide-react';

interface QuickActionsProps {
  onAddShipment?: () => void;
  onAddDriver?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAddShipment, onAddDriver }) => {
  return (
    <div className="bg-formBg rounded-xl p-6 border border-slate-800 shadow-2xl h-full flex flex-col">
      <h2 className="text-slate-200 font-medium mb-6">Quick Actions</h2>
      
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        <button 
          onClick={onAddShipment}
          className="w-full flex items-center justify-between bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 rounded-xl p-4 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all group"
        >
          <PlusSquare className="w-5 h-5 opacity-80" />
          <span className="font-bold text-sm w-1/2 text-center leading-tight">Schedule New Shipment</span>
          <span className="w-5 h-5 flex items-center justify-center opacity-80 font-bold group-hover:translate-x-1 transition-transform">›</span>
        </button>

        <button 
          onClick={onAddDriver}
          className="w-full flex items-center justify-between bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl p-4 hover:border-slate-500 transition-all group"
        >
          <UserPlus className="w-5 h-5 text-slate-400" />
          <span className="font-bold text-sm">Add Driver</span>
          <span className="w-5 h-5 flex items-center justify-center text-slate-500 group-hover:translate-x-1 transition-transform">›</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;

import React from 'react';
import { Plus, Filter } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import ShipmentBoard from '../components/shipments/ShipmentBoard';

const ShipmentsPage: React.FC = () => {
  const topbarAction = (
    <div className="flex space-x-4">
      <button className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-full px-5 py-2 font-bold text-sm transition-all hover:bg-slate-800 hover:text-white">
        <Filter className="w-4 h-4" />
        <span>Filter</span>
      </button>
      <button className="flex items-center space-x-2 bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 rounded-full px-5 py-2 font-bold text-sm transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
        <Plus className="w-4 h-4" />
        <span>New Shipment</span>
      </button>
    </div>
  );

  return (
    <MainLayout topbarAction={topbarAction}>
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Shipment Management</h1>
          <p className="text-sm text-slate-400">Monitor and re-route global supply chains in real-time.</p>
        </div>
        
        <div className="flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory pb-4">
          <div className="min-w-[1200px] lg:min-w-0 h-full">
            <ShipmentBoard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShipmentsPage;

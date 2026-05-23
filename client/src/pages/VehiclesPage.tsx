import React from 'react';
import { Plus } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import VehicleMetrics from '../components/vehicles/VehicleMetrics';
import FleetList from '../components/vehicles/FleetList';
import VehicleTelemetry from '../components/vehicles/VehicleTelemetry';

const VehiclesPage: React.FC = () => {
  const topbarAction = (
    <button className="flex items-center space-x-2 bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 rounded-full px-5 py-2 font-bold text-sm transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
      <Plus className="w-4 h-4" />
      <span>Add Vehicle</span>
    </button>
  );

  return (
    <MainLayout topbarAction={topbarAction}>
      <div className="max-w-[1600px] mx-auto space-y-6 h-full flex flex-col">
        {/* Top Metrics Row */}
        <div className="h-32 shrink-0">
          <VehicleMetrics />
        </div>

        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[600px]">
          {/* Left Column: Fleet Overview Table */}
          <div className="lg:col-span-5 h-full">
            <FleetList />
          </div>
          
          {/* Right Column: Telemetry View */}
          <div className="lg:col-span-7 h-full">
            <VehicleTelemetry />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VehiclesPage;

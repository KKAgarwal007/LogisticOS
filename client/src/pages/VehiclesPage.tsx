import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import MainLayout from '../components/layout/MainLayout';
import VehicleMetrics from '../components/vehicles/VehicleMetrics';
import FleetList, { type Vehicle } from '../components/vehicles/FleetList';
import VehicleTelemetry from '../components/vehicles/VehicleTelemetry';
import Modal from '../components/ui/Modal';
import AddVehicleForm from '../components/forms/AddVehicleForm';

const VehiclesPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('https://logisticos-q046.onrender.com/api/data/vehicles');
        setVehicles(res.data);
      } catch (err) {
        console.error('Failed to fetch vehicles', err);
      }
    };
    fetchVehicles();
  }, [refreshKey]);

  const topbarAction = (
    <button 
      onClick={() => setIsAddModalOpen(true)}
      className="flex items-center space-x-2 bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 rounded-full px-5 py-2 font-bold text-sm transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
    >
      <Plus className="w-4 h-4" />
      <span>Add Vehicle</span>
    </button>
  );

  return (
    <MainLayout topbarAction={topbarAction}>
      <div className="max-w-[1600px] mx-auto space-y-6 h-full flex flex-col">
        {/* Top Metrics Row */}
        <div className="h-32 shrink-0">
          <VehicleMetrics vehicles={vehicles} />
        </div>

        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[600px]">
          {/* Left Column: Fleet Overview Table */}
          <div className="lg:col-span-5 h-full">
            <FleetList 
              vehicles={vehicles}
              selectedVehicleId={selectedVehicleId}
              onSelectVehicle={setSelectedVehicleId}
            />
          </div>
          
          {/* Right Column: Telemetry View */}
          <div className="lg:col-span-7 h-full">
            <VehicleTelemetry vehicle={vehicles.find(v => v.vehicleId === selectedVehicleId) || null} />
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Register New Vehicle"
      >
        <AddVehicleForm 
          onSuccess={() => {
            setIsAddModalOpen(false);
            setRefreshKey(prev => prev + 1);
          }} 
          onCancel={() => setIsAddModalOpen(false)} 
        />
      </Modal>
    </MainLayout>
  );
};

export default VehiclesPage;

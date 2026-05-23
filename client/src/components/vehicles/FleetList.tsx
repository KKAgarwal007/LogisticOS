import React from 'react';
import { Truck, Navigation, Filter, Download } from 'lucide-react';

export interface Vehicle {
  vehicleId: string;
  class: string;
  capacity: string;
  status: string;
}

interface FleetListProps {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string) => void;
}

const FleetList: React.FC<FleetListProps> = ({ vehicles, selectedVehicleId, onSelectVehicle }) => {

  return (
    <div className="bg-formBg rounded-xl border border-slate-800 h-full flex flex-col">
      <div className="p-5 flex justify-between items-center border-b border-slate-800/50">
        <h2 className="text-slate-200 font-medium text-sm">Fleet Overview</h2>
        <div className="flex space-x-4 text-slate-400">
          <Filter className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          <Download className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="flex-1 overflow-x-auto min-h-0">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800/50 text-xs font-mono tracking-widest text-slate-500 uppercase">
              <th className="py-4 px-6 font-bold">Vehicle<br/>ID</th>
              <th className="py-4 px-6 font-bold">Class</th>
              <th className="py-4 px-6 font-bold">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr 
                key={v.vehicleId} 
                onClick={() => onSelectVehicle(v.vehicleId)}
                className={`border-b border-slate-800/50 transition-colors cursor-pointer ${selectedVehicleId === v.vehicleId ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-slate-800/30'}`}
              >
                <td className={`py-5 px-6 font-mono text-sm font-bold ${selectedVehicleId === v.vehicleId ? 'text-primary' : 'text-slate-300'}`}>
                  {v.vehicleId}
                </td>
                <td className="py-5 px-6 flex items-center space-x-3 text-sm text-slate-300">
                  {v.class === 'Electric Van' || v.class === 'Light Transport' ? <Navigation className="w-4 h-4 text-slate-500 rotate-90" /> : <Truck className="w-4 h-4 text-slate-500" />}
                  <span>{v.class}</span>
                </td>
                <td className="py-5 px-6 text-sm text-slate-400 font-mono">
                  {v.capacity} kg
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FleetList;

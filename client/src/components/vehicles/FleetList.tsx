import React from 'react';
import { Truck, Navigation, Filter, Download } from 'lucide-react';

interface Vehicle {
  id: string;
  classType: string;
  capacity: string;
  isActive: boolean;
}

const FleetList: React.FC = () => {
  const vehicles: Vehicle[] = [
    { id: 'VX-8802', classType: 'Heavy Duty', capacity: '24.5 / 25T', isActive: true },
    { id: 'VN-4412', classType: 'Van', capacity: '3.2 / 4T', isActive: false },
    { id: 'HD-0091', classType: 'Heavy Duty', capacity: '32.1 / 35T', isActive: false },
    { id: 'VN-4455', classType: 'Van', capacity: '4.5 / 5T', isActive: false },
  ];

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
            {vehicles.map((v, i) => (
              <tr 
                key={v.id} 
                className={`border-b border-slate-800/50 transition-colors cursor-pointer ${v.isActive ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-slate-800/30'}`}
              >
                <td className={`py-5 px-6 font-mono text-sm font-bold ${v.isActive ? 'text-primary' : 'text-slate-300'}`}>
                  {v.id}
                </td>
                <td className="py-5 px-6 flex items-center space-x-3 text-sm text-slate-300">
                  {v.classType === 'Van' ? <Navigation className="w-4 h-4 text-slate-500 rotate-90" /> : <Truck className="w-4 h-4 text-slate-500" />}
                  <span>{v.classType}</span>
                </td>
                <td className="py-5 px-6 text-sm text-slate-400 font-mono">
                  {v.capacity}
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

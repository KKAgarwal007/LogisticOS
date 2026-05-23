import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import DriverCard, { type Driver } from '../components/drivers/DriverCard';
import DriverTimeline from '../components/drivers/DriverTimeline';

const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'Marcus Vance',
    seed: 'Marcus',
    isOnline: true,
    role: 'Expert',
    stars: 4,
    vehicle: 'VH-9921-X Heavy Transporter',
    rating: '98.2%',
    experience: '12 Yrs'
  },
  {
    id: 'd2',
    name: 'Elena Rodriguez',
    seed: 'Elena',
    isOnline: true,
    role: 'Senior',
    stars: 4,
    vehicle: 'VH-4402-E Electric Cargo',
    rating: '94.5%',
    experience: '6 Yrs'
  },
  {
    id: 'd3',
    name: 'Samuel Lee',
    seed: 'Samuel',
    isOnline: false,
    role: 'Junior',
    stars: 3,
    vehicle: 'VH-1022-S Sprinter Van',
    rating: '89.0%',
    experience: '2 Yrs'
  },
  {
    id: 'd4',
    name: 'Sasha Kozlov',
    seed: 'Sasha',
    isOnline: true,
    role: 'Expert',
    stars: 5,
    vehicle: 'VH-8850-T Long Haul T1',
    rating: '99.9%',
    experience: '15 Yrs'
  }
];

const DriversPage: React.FC = () => {
  const topbarAction = (
    <div className="font-mono font-bold tracking-widest text-slate-300">
      DRV-CTRL
    </div>
  );

  return (
    <MainLayout topbarAction={topbarAction}>
      <div className="max-w-7xl mx-auto flex flex-col h-full">
        {/* Header and Tabs */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Personnel Logistics</h1>
            <p className="text-sm text-slate-400">Real-time monitoring and shift management of 124 active operators.</p>
          </div>
          
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button className="px-6 py-2 text-xs font-mono font-bold rounded-md bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              On-Duty<br/><span className="font-normal opacity-80">(82)</span>
            </button>
            <button className="px-6 py-2 text-xs font-mono font-bold rounded-md text-slate-400 hover:text-white transition-colors">
              Off-Duty<br/><span className="font-normal opacity-80">(34)</span>
            </button>
            <button className="px-6 py-2 text-xs font-mono font-bold rounded-md text-slate-400 hover:text-white transition-colors">
              On-Leave<br/><span className="font-normal opacity-80">(8)</span>
            </button>
          </div>
        </div>

        {/* Driver Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDrivers.map(driver => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-auto">
          <DriverTimeline />
        </div>
      </div>
    </MainLayout>
  );
};

export default DriversPage;

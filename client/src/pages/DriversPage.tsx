import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import DriverCard, { type Driver } from '../components/drivers/DriverCard';
import DriverTimeline from '../components/drivers/DriverTimeline';
import Modal from '../components/ui/Modal';
import AddDriverForm from '../components/forms/AddDriverForm';
import { Plus } from 'lucide-react';
import axios from 'axios';

const DriversPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [activeTab, setActiveTab] = useState<'On-Duty' | 'Off-Duty' | 'On-Leave'>('On-Duty');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get('https://logisticos-q046.onrender.com/api/data/drivers');
        const formatted = res.data.map((d: any) => ({
          ...d,
          id: d._id
        }));
        setDrivers(formatted);
      } catch (err) {
        console.error('Failed to fetch drivers', err);
      }
    };
    fetchDrivers();
  }, [refreshKey]);

  const onDutyCount = drivers.filter(d => d.status === 'On-Duty').length;
  const offDutyCount = drivers.filter(d => d.status === 'Off-Duty').length;
  const onLeaveCount = drivers.filter(d => d.status === 'On-Leave').length;

  const filteredDrivers = drivers.filter(d => d.status === activeTab);

  const topbarAction = (
    <div className="flex space-x-4">
      <div className="font-mono font-bold tracking-widest text-slate-300 hidden sm:flex items-center">
        DRV-CTRL
      </div>
      <button 
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center space-x-2 bg-primary hover:bg-cyan-300 text-slate-900 px-4 py-2 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      >
        <Plus className="w-4 h-4" />
        <span>Add Driver</span>
      </button>
    </div>
  );

  return (
    <MainLayout topbarAction={topbarAction}>
      <div className="max-w-7xl mx-auto flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Personnel Logistics</h1>
            <p className="text-sm text-slate-400">Real-time monitoring and shift management of {drivers.length} registered operators.</p>
          </div>
          
          <div className="grid grid-cols-3 w-full md:w-auto md:flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button 
              onClick={() => setActiveTab('On-Duty')}
              className={`px-6 py-2 text-xs font-mono font-bold rounded-md transition-colors ${activeTab === 'On-Duty' ? 'bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'}`}
            >
              On-Duty<br/><span className="font-normal opacity-80">({onDutyCount})</span>
            </button>
            <button 
              onClick={() => setActiveTab('Off-Duty')}
              className={`px-6 py-2 text-xs font-mono font-bold rounded-md transition-colors ${activeTab === 'Off-Duty' ? 'bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'}`}
            >
              Off-Duty<br/><span className="font-normal opacity-80">({offDutyCount})</span>
            </button>
            <button 
              onClick={() => setActiveTab('On-Leave')}
              className={`px-6 py-2 text-xs font-mono font-bold rounded-md transition-colors ${activeTab === 'On-Leave' ? 'bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'}`}
            >
              On-Leave<br/><span className="font-normal opacity-80">({onLeaveCount})</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDrivers.map(driver => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
          {filteredDrivers.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 font-mono border border-dashed border-slate-700 rounded-xl bg-slate-900/30">
              No drivers found in this category.
            </div>
          )}
        </div>

        <div className="mt-auto pt-8">
          <DriverTimeline />
        </div>
      </div>
      
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Register New Driver"
      >
        <AddDriverForm 
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

export default DriversPage;

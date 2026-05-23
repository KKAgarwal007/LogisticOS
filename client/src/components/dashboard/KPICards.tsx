import React, { useState, useEffect } from 'react';
import { Truck, Activity, Package, UserCircle, TriangleAlert } from 'lucide-react';
import axios from 'axios';

const KPICards: React.FC = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeDeliveries: 0,
    pendingShipments: 0,
    delayed: 0,
    activeDrivers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [vehiclesRes, shipmentsRes, driversRes] = await Promise.all([
          axios.get('https://logisticos-q046.onrender.com/api/data/vehicles'),
          axios.get('https://logisticos-q046.onrender.com/api/data/shipments'),
          axios.get('https://logisticos-q046.onrender.com/api/data/drivers')
        ]);
        
        const vehicles = vehiclesRes.data;
        const shipments = shipmentsRes.data;
        const drivers = driversRes.data;

        setStats({
          totalVehicles: vehicles.length,
          activeDeliveries: shipments.filter((s: any) => s.columnId === 'in_transit').length,
          pendingShipments: shipments.filter((s: any) => s.columnId === 'pending').length,
          delayed: 0, // Placeholder
          activeDrivers: drivers.filter((d: any) => d.status === 'On-Duty').length
        });
      } catch (err) {
        console.error('Failed to fetch KPI stats', err);
      }
    };
    fetchStats();
    
    // Auto refresh stats every 30s
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: 'Total Vehicles',
      value: stats.totalVehicles.toString(),
      status: 'Live',
      statusColor: 'text-white font-bold',
      icon: Truck,
      glow: 'shadow-[0_-2px_10px_rgba(255,255,255,0.1)]',
    },
    {
      title: 'Active Deliveries',
      value: stats.activeDeliveries.toString(),
      status: 'Active',
      statusColor: 'text-emerald-400',
      icon: Activity,
      glow: 'shadow-[0_-2px_10px_rgba(52,211,153,0.1)] border-t border-emerald-500/30',
    },
    {
      title: 'Pending Shipments',
      value: stats.pendingShipments.toString(),
      status: 'Queue',
      statusColor: 'text-purple-400',
      icon: Package,
      glow: 'shadow-[0_-2px_10px_rgba(167,139,250,0.1)] border-t border-purple-500/30',
    },
    {
      title: 'Drivers Active',
      value: stats.activeDrivers.toString(),
      status: 'On-Duty',
      statusColor: 'text-blue-400',
      icon: UserCircle,
      glow: 'shadow-[0_-2px_10px_rgba(96,165,250,0.1)] border-t border-blue-500/30',
    },
    {
      title: 'Delayed Deliveries',
      value: stats.delayed.toString(),
      status: 'Critical',
      statusColor: 'text-red-400',
      icon: TriangleAlert,
      glow: 'shadow-[0_-2px_10px_rgba(248,113,113,0.1)] border-t border-red-500/30',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className={`bg-formBg rounded-xl p-5 border border-slate-800 ${card.glow} transition-all hover:bg-slate-800/80`}>
          <div className="flex justify-between items-start mb-4">
            <card.icon className="w-5 h-5 text-slate-400" />
            <span className={`text-xs font-mono tracking-wider ${card.statusColor}`}>{card.status}</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">{card.value}</h3>
            <p className="text-sm text-slate-400 font-medium w-20 leading-tight">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;

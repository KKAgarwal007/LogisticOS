import React from 'react';
import { Truck, Activity, Package, UserCircle, TriangleAlert } from 'lucide-react';

const KPICards: React.FC = () => {
  const cards = [
    {
      title: 'Total Vehicles',
      value: '142',
      status: '+12%',
      statusColor: 'text-white font-bold',
      icon: Truck,
      glow: 'shadow-[0_-2px_10px_rgba(255,255,255,0.1)]',
    },
    {
      title: 'Active Deliveries',
      value: '38',
      status: 'Active',
      statusColor: 'text-emerald-400',
      icon: Activity,
      glow: 'shadow-[0_-2px_10px_rgba(52,211,153,0.1)] border-t border-emerald-500/30',
    },
    {
      title: 'Pending Shipments',
      value: '12',
      status: 'Queue',
      statusColor: 'text-purple-400',
      icon: Package,
      glow: 'shadow-[0_-2px_10px_rgba(167,139,250,0.1)] border-t border-purple-500/30',
    },
    {
      title: 'Drivers Active',
      value: '84',
      status: 'On-Duty',
      statusColor: 'text-blue-400',
      icon: UserCircle,
      glow: 'shadow-[0_-2px_10px_rgba(96,165,250,0.1)] border-t border-blue-500/30',
    },
    {
      title: 'Delayed Deliveries',
      value: '3',
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

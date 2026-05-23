import React from 'react';
import { Truck, CheckCircle2, AlertOctagon } from 'lucide-react';

const ActivityFeed: React.FC = () => {
  const activities = [
    {
      id: 1,
      icon: Truck,
      iconColor: 'text-slate-300',
      iconBg: 'bg-slate-700',
      title: (
        <>
          <span className="text-white font-medium">Truck #42</span> departed from <span className="text-slate-300">Central Hub A</span>
        </>
      ),
      time: '2 minutes ago',
      meta: 'Destination: Port 7'
    },
    {
      id: 2,
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20',
      title: (
        <>
          <span className="text-emerald-400 font-medium">Shipment #2984</span> successfully delivered
        </>
      ),
      time: '15 minutes ago',
      meta: 'Receiver: Global Logistics Ltd.'
    },
    {
      id: 3,
      icon: AlertOctagon,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/20',
      title: (
        <>
          <span className="text-red-400 font-medium">Alert:</span> Delayed dispatch at <span className="text-slate-300">Northern Terminal</span>
        </>
      ),
      time: '42 minutes ago',
      meta: 'Weather conditions impacting flight path'
    }
  ];

  return (
    <div className="bg-formBg rounded-xl p-6 border border-slate-800 shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-slate-200 font-medium">Live Activity Feed</h2>
        <span className="text-emerald-400 text-xs font-bold font-mono tracking-widest">Live System</span>
      </div>

      <div className="space-y-6 flex-1">
        {activities.map((activity) => (
          <div key={activity.id} className="flex space-x-4">
            <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.iconBg}`}>
              <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-slate-400 leading-snug">{activity.title}</p>
              <div className="flex items-center space-x-2 mt-1.5">
                <span className="text-xs text-slate-500 font-mono">{activity.time}</span>
                <span className="text-xs text-slate-600 font-mono">•</span>
                <span className="text-xs text-slate-500 font-mono">{activity.meta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;

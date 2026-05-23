import React from 'react';

const DriverTimeline: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Shift Completed: Sasha Kozlov',
      description: 'Route AX-092 delivered with 0 discrepancies. Duration: 8h 12m.',
      time: '12:42 PM',
      status: '+120 Credits',
      statusColor: 'text-emerald-400'
    },
    {
      id: 2,
      title: 'New Shift Assigned: Elena Rodriguez',
      description: 'Vehicle VH-4402-E initialized. Route: Port Alpha to Sector 7 Distribution.',
      time: '11:15 AM',
      status: 'Operational',
      statusColor: 'text-cyan-400'
    },
    {
      id: 3,
      title: 'Unscheduled Break: Samuel Lee',
      description: 'System detected stationary status for 30m in Rest Zone Bravo.',
      time: '09:38 AM',
      status: 'Alert Sent',
      statusColor: 'text-red-400'
    }
  ];

  return (
    <div className="bg-formBg rounded-xl border border-slate-800 shadow-xl overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-200">Driver Activity Timeline</h2>
        <button className="text-xs font-mono font-bold tracking-widest text-primary hover:text-white transition-colors uppercase">
          Export Logs
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-slate-900/40 border border-slate-800/50 rounded-lg p-5 flex justify-between items-start hover:border-slate-700/50 transition-colors">
            <div>
              <h3 className="text-slate-200 font-mono text-sm font-bold mb-1">{event.title}</h3>
              <p className="text-slate-400 text-sm">{event.description}</p>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-xs text-slate-500 font-mono font-bold mb-1">{event.time}</span>
              <span className={`text-xs font-mono font-bold ${event.statusColor}`}>{event.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverTimeline;

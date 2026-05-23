import React from 'react';
import { CheckCircle2, ListTodo, Plus } from 'lucide-react';

const UpcomingTasks: React.FC = () => {
  const tasks = [
    {
      time: '09:00 AM',
      title: 'Manifest Verification',
      desc: 'Cross-check Cargo-Z with API logs.',
      status: 'past'
    },
    {
      time: '11:30 AM',
      title: 'Route Optimization',
      desc: 'Finalize path for Bulk Carrier G-5.',
      status: 'active'
    },
    {
      time: '02:00 PM',
      title: 'Fleet Maintenance Call',
      desc: 'Meeting with Mechanical Team.',
      status: 'upcoming'
    }
  ];

  return (
    <div className="bg-formBg rounded-xl border border-slate-800 p-6 shadow-xl h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center space-x-2 text-slate-300 mb-8">
        <ListTodo className="w-5 h-5" />
        <h2 className="text-xs font-mono font-bold tracking-widest uppercase">Upcoming Tasks</h2>
      </div>

      <div className="flex-1 relative">
        {/* Timeline Line */}
        <div className="absolute left-1.5 top-2 bottom-8 w-px bg-slate-800"></div>

        <div className="space-y-8">
          {tasks.map((task, idx) => (
            <div key={idx} className={`relative pl-8 ${task.status === 'past' ? 'opacity-60' : ''}`}>
              {/* Timeline Dot */}
              {task.status === 'past' && (
                <div className="absolute left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              )}
              {task.status === 'active' && (
                <div className="absolute left-[-2px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-slate-900 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              )}
              {task.status === 'upcoming' && (
                <div className="absolute left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-slate-600"></div>
              )}

              <div className="text-xs font-mono font-bold text-slate-400 mb-1">{task.time}</div>
              <h3 className={`text-sm font-bold mb-1 ${task.status === 'active' ? 'text-white' : 'text-slate-300'}`}>{task.title}</h3>
              {task.desc && <p className="text-xs text-slate-500 leading-snug">{task.desc}</p>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default UpcomingTasks;

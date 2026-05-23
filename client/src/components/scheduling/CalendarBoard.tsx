import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarEvent {
  id: string;
  day: number;
  title: string;
  type: 'express' | 'bulk' | 'maintenance';
}

const mockEvents: CalendarEvent[] = [
  { id: '1', day: 1, title: 'TX-402 Berlin Dispatch', type: 'express' },
  { id: '2', day: 3, title: 'Van-9 Routine Checkup', type: 'maintenance' },
  { id: '3', day: 5, title: 'Sea-Port Bulk Load', type: 'bulk' },
  { id: '4', day: 5, title: 'AMS-01 Direct', type: 'express' },
  { id: '5', day: 9, title: 'FRA Hub Connection', type: 'express' },
  { id: '6', day: 11, title: 'Steel-X Logistics', type: 'bulk' },
  { id: '7', day: 16, title: 'Driver Training Sem.', type: 'maintenance' },
];

const CalendarBoard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'express': return 'bg-slate-700/80 text-cyan-200 border-l-4 border-cyan-400';
      case 'bulk': return 'bg-emerald-900/40 text-emerald-300 border-l-4 border-emerald-500';
      case 'maintenance': return 'bg-purple-900/40 text-purple-300 border-l-4 border-purple-400';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  const getEventDotColor = (type: string) => {
    switch (type) {
      case 'express': return 'bg-cyan-400';
      case 'bulk': return 'bg-emerald-400';
      case 'maintenance': return 'bg-purple-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="bg-formBg rounded-xl border border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-xl font-bold text-white tracking-wide flex items-center">
              <button onClick={prevMonth} className="mr-2 hover:text-primary transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              {format(currentDate, "MMMM yyyy")}
              <button onClick={nextMonth} className="ml-2 hover:text-primary transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </h2>
          </div>
          <div className="flex space-x-6 text-xs font-mono text-slate-400 font-bold tracking-widest">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span> Express Transit</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> Bulk Carrier</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-400 mr-2 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span> Maintenance</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button className="px-5 py-2 text-xs font-mono font-bold rounded-md bg-slate-700 text-white shadow-lg">Month</button>
            <button className="px-5 py-2 text-xs font-mono font-bold rounded-md text-slate-400 hover:text-white transition-colors">Week</button>
            <button className="px-5 py-2 text-xs font-mono font-bold rounded-md text-slate-400 hover:text-white transition-colors">Day</button>
          </div>
          <button className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 rounded-lg transition-transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-900/50">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="py-4 text-center text-xs font-mono font-bold tracking-widest text-slate-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-hidden">
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isCurrentDay = isToday(day);
          const dayNumber = parseInt(format(day, dateFormat));
          const dayEvents = isCurrentMonth ? mockEvents.filter(e => e.day === dayNumber) : [];

          return (
            <div 
              key={day.toString()} 
              className={`min-h-[80px] md:min-h-[120px] border-r border-b border-slate-800/50 p-1 md:p-2 transition-colors hover:bg-slate-800/20 ${!isCurrentMonth ? 'bg-slate-900/20 opacity-50' : ''} ${isCurrentDay ? 'bg-primary/5' : ''}`}
            >
              <div className={`text-xs md:text-sm font-mono font-bold mb-1 md:mb-2 text-center md:text-left ${isCurrentDay ? 'text-primary' : 'text-slate-300'} ${isCurrentMonth ? '' : 'text-slate-600'}`}>
                {format(day, dateFormat)}
              </div>
              
              {/* Desktop View: Full Labels */}
              <div className="space-y-1.5 hidden md:block">
                {dayEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={`text-[10px] px-2 py-1.5 rounded-sm font-bold leading-tight cursor-pointer hover:opacity-80 transition-opacity ${getEventStyle(event.type)}`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>

              {/* Mobile View: Simple Dots */}
              <div className="flex flex-wrap justify-center gap-1 mt-1 md:hidden">
                {dayEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={`w-2 h-2 rounded-full shadow-sm ${getEventDotColor(event.type)}`}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarBoard;

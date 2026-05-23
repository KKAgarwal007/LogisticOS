import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, isSameDay } from 'date-fns';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

export interface CalendarEvent {
  _id: string;
  date: string;
  title: string;
  type: 'express' | 'bulk' | 'maintenance';
}

interface CalendarBoardProps {
  onAddSchedule?: () => void;
  refreshKey?: number;
}

const CalendarBoard: React.FC<CalendarBoardProps> = ({ onAddSchedule, refreshKey = 0 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/data/schedules');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch schedules', err);
      }
    };
    fetchSchedules();
  }, [refreshKey]);

  useEffect(() => {
    const handleNewSchedule = (schedule: CalendarEvent) => {
      setEvents(prev => [...prev, schedule]);
    };
    socket.on('schedule_created', handleNewSchedule);
    return () => {
      socket.off('schedule_created', handleNewSchedule);
    };
  }, []);

  let startDate, endDate;
  if (viewMode === 'month') {
    startDate = startOfWeek(startOfMonth(currentDate));
    endDate = endOfWeek(endOfMonth(currentDate));
  } else if (viewMode === 'week') {
    startDate = startOfWeek(currentDate);
    endDate = endOfWeek(currentDate);
  } else {
    startDate = currentDate;
    endDate = currentDate;
  }

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextPeriod = () => {
    if (viewMode === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (viewMode === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const prevPeriod = () => {
    if (viewMode === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (viewMode === 'week') setCurrentDate(subWeeks(currentDate, 1));
    else setCurrentDate(subDays(currentDate, 1));
  };

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

  const gridColsClass = viewMode === 'day' ? 'grid-cols-1' : 'grid-cols-7';
  const gridRowsClass = viewMode === 'month' ? 'grid-rows-5' : 'grid-rows-1';

  return (
    <div className="bg-formBg rounded-xl border border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-xl font-bold text-white tracking-wide flex items-center">
              <button onClick={prevPeriod} className="mr-2 hover:text-primary transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              {viewMode === 'day' ? format(currentDate, "MMMM d, yyyy") : format(currentDate, "MMMM yyyy")}
              <button onClick={nextPeriod} className="ml-2 hover:text-primary transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </h2>
          </div>
          <div className="flex space-x-6 text-xs font-mono text-slate-400 font-bold tracking-widest flex-wrap gap-y-2">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span> Express Transit</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> Bulk Carrier</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-400 mr-2 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span> Maintenance</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button onClick={() => setViewMode('month')} className={`px-5 py-2 text-xs font-mono font-bold rounded-md transition-colors ${viewMode === 'month' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Month</button>
            <button onClick={() => setViewMode('week')} className={`px-5 py-2 text-xs font-mono font-bold rounded-md transition-colors ${viewMode === 'week' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Week</button>
            <button onClick={() => setViewMode('day')} className={`px-5 py-2 text-xs font-mono font-bold rounded-md transition-colors ${viewMode === 'day' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Day</button>
          </div>
          <button onClick={onAddSchedule} className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-primary/30 to-cyan-300 bg-cyan-200 text-slate-900 rounded-lg transition-transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Header (Hidden in day view) */}
      {viewMode !== 'day' && (
        <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-900/50">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="py-4 text-center text-xs font-mono font-bold tracking-widest text-slate-400">
              {day}
            </div>
          ))}
        </div>
      )}

      {/* Calendar Grid */}
      <div className={`flex-1 grid ${gridColsClass} ${gridRowsClass} overflow-hidden`}>
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);
          
          const dayEvents = events.filter(e => {
            const eventDate = new Date(e.date);
            return isSameDay(eventDate, day);
          });

          return (
            <div 
              key={day.toString()} 
              className={`border-r border-b border-slate-800/50 p-2 md:p-3 transition-colors hover:bg-slate-800/20 overflow-y-auto custom-scrollbar 
                ${!isCurrentMonth && viewMode === 'month' ? 'bg-slate-900/20 opacity-50' : ''} 
                ${isCurrentDay ? 'bg-primary/5' : ''}
              `}
            >
              <div className={`text-xs md:text-sm font-mono font-bold mb-2 md:mb-3 text-center md:text-left ${isCurrentDay ? 'text-primary' : 'text-slate-300'} ${isCurrentMonth || viewMode !== 'month' ? '' : 'text-slate-600'}`}>
                {viewMode === 'day' ? format(day, "EEEE, MMMM d") : format(day, "d")}
              </div>
              
              {/* Desktop View: Full Labels */}
              <div className="space-y-2 hidden md:block">
                {dayEvents.map(event => (
                  <div 
                    key={event._id} 
                    className={`text-[11px] px-2 py-2 rounded-sm font-bold leading-tight cursor-pointer hover:opacity-80 transition-opacity ${getEventStyle(event.type)}`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>

              {/* Mobile View: Simple Dots */}
              <div className="flex flex-wrap justify-center gap-1 mt-1 md:hidden">
                {dayEvents.map(event => (
                  <div 
                    key={event._id} 
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

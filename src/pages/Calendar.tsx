import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isToday, 
  eachDayOfInterval,
  isSameDay
} from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Inbox, 
  Calendar as CalendarIcon,
  Box,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-rose-500 mb-2">
          <CalendarIcon size={18} />
          <span className="text-sm font-medium tracking-tight">Calendar</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          Schedule the work, hold the maybes.
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed font-medium">
          Add tasks and reminders to dates, keep unscheduled drafts nearby, and drag work into place when the plan firms up.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Main Calendar Section */}
        <div className="flex-1 bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
          {/* Calendar Toolbar */}
          <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-none mb-1.5">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <p className="text-[13px] text-slate-400 font-bold">
                Drop drafts or scheduled items onto any date.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="bg-slate-50 p-1 rounded-xl flex items-center border border-slate-100">
                <button 
                  onClick={() => setView('month')}
                  className={cn(
                    "px-4 py-1.5 text-xs font-black rounded-lg transition-all",
                    view === 'month' ? "bg-rose-500 text-white shadow-md shadow-rose-100" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  Month
                </button>
                <button 
                  onClick={() => setView('week')}
                  className={cn(
                    "px-4 py-1.5 text-xs font-black rounded-lg transition-all",
                    view === 'week' ? "bg-rose-500 text-white shadow-md shadow-rose-100" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  Week
                </button>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={goToToday}
                  className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <CalendarIcon size={14} className="text-slate-400" />
                  Today
                </button>
                <div className="flex items-center bg-white border border-slate-100 rounded-xl overflow-hidden">
                  <button onClick={prevMonth} className="p-2 hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600">
                    <ChevronLeft size={18} />
                  </button>
                  <div className="w-[1px] h-4 bg-slate-100" />
                  <button onClick={nextMonth} className="p-2 hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button className="px-5 py-2.5 bg-[#F05D50] text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-[#e04d40] transition-colors shadow-lg shadow-orange-100">
                <Plus size={18} />
                New task
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 border-b border-slate-50">
            {weekDays.map(day => (
              <div key={day} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-50 last:border-r-0 bg-slate-50/30">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 grid-rows-5">
            {calendarDays.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isCurrentDay = isToday(day);
              
              return (
                <div 
                  key={day.toString()} 
                  className={cn(
                    "min-h-[120px] p-4 border-r border-b border-slate-50 last:border-r-0 group transition-colors hover:bg-slate-50/50 cursor-pointer relative",
                    !isCurrentMonth && "bg-slate-50/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "text-xs font-black w-7 h-7 flex items-center justify-center rounded-lg transition-all",
                      isCurrentDay 
                        ? "bg-[#F05D50] text-white shadow-lg shadow-orange-100" 
                        : isCurrentMonth ? "text-slate-900" : "text-slate-300"
                    )}>
                      {format(day, 'd')}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded-md text-slate-400 transition-all">
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  {/* Event Placeholders could go here */}
                  <div className="space-y-1">
                    {/* Placeholder for real tasks */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Draft Task Panel */}
        <div className="w-full xl:w-80 space-y-4">
          <div className="bg-[#E9F5F1] border border-[#D7ECE5] rounded-[32px] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-black text-slate-900 leading-none mb-1">Draft Task Panel</h3>
                <p className="text-[11px] text-emerald-600/70 font-bold uppercase tracking-wider">Unscheduled work waits here.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white px-2 py-0.5 rounded-lg text-[10px] font-black text-slate-400 border border-emerald-100">0</span>
                <button className="p-1.5 hover:bg-white rounded-lg text-emerald-600 transition-colors">
                  <Inbox size={16} />
                </button>
              </div>
            </div>

            <button className="w-full bg-white border-2 border-dashed border-emerald-200 py-3 rounded-2xl text-xs font-black text-emerald-600 flex items-center justify-center gap-2 hover:bg-white/80 hover:border-emerald-300 transition-all mb-6">
              <Plus size={16} />
              Add draft
            </button>

            <div className="bg-white/50 border border-dashed border-emerald-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm mb-3">
                <Inbox size={20} />
              </div>
              <p className="text-xs font-black text-slate-900 mb-1">No drafts waiting</p>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                Save unscheduled tasks here, then drag them onto a date.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3">
               <Box size={40} className="text-slate-50 rotate-12 transition-transform group-hover:scale-110" />
            </div>
            <h4 className="text-sm font-black text-slate-900 mb-2">Workspace Tip</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed relative z-10">
              You can drag items from your "Draft Task Panel" directly onto the calendar to schedule them instantly.
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button (Optional/Visual) */}
      <div className="fixed bottom-8 right-8 xl:hidden">
        <button className="w-14 h-14 bg-[#F05D50] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-200 hover:scale-110 transition-transform">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}

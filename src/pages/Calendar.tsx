import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  addWeeks,
  subWeeks,
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isToday, 
  eachDayOfInterval,
  isSameDay,
  parseISO
} from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Inbox, 
  Calendar as CalendarIcon,
  Box,
  MoreHorizontal,
  Loader2,
  Zap,
  Target,
  User,
  Briefcase,
  Clock
} from 'lucide-react';
import { useTaskModal } from '../context/TaskContext';
import { cn } from '../lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { fetchTasks, Task, updateTask } from '../lib/tasksApi';
import { DndContext, useDraggable, useDroppable, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// --- Helper Components ---

function DraggableTask({ task, getCategoryColor, getCategoryIcon }: { task: Task, getCategoryColor: (c: string) => string, getCategoryIcon: (c: string) => React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    zIndex: 50,
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className={cn(
        "px-2 py-1 rounded-lg border text-[10px] font-bold truncate flex flex-col shadow-sm gap-0.5 cursor-grab active:cursor-grabbing bg-white",
        getCategoryColor(task.category)
      )}
    >
      <div className="flex items-center gap-1.5 truncate">
        {getCategoryIcon(task.category)}
        <span className="truncate">{task.title}</span>
      </div>
      {task.time && (
        <div className="flex items-center gap-1 text-[9px] opacity-80 pl-3.5">
          <Clock size={8} />
          <span>{task.time}</span>
        </div>
      )}
    </div>
  );
}

function DroppableDay({ day, isCurrentMonth, isCurrentDay, openTaskModal, children }: { day: Date, isCurrentMonth: boolean, isCurrentDay: boolean, openTaskModal: (d: Date) => void, children: React.ReactNode }) {
  const dateString = format(day, 'yyyy-MM-dd');
  const { isOver, setNodeRef } = useDroppable({
    id: dateString,
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "min-h-[140px] p-4 border-r border-b border-slate-200 group transition-colors relative",
        !isCurrentMonth && "bg-slate-50/10 text-slate-300",
        isOver && "bg-indigo-50/50"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={cn(
          "text-[13px] font-black w-7 h-7 flex items-center justify-center rounded-lg transition-all",
          isCurrentDay 
            ? "bg-[#F05D50] text-white shadow-lg shadow-orange-100" 
            : isCurrentMonth ? "text-slate-900 font-bold" : "text-slate-300"
        )}>
          {format(day, 'd')}
        </span>
        <button 
          onClick={() => openTaskModal(day)}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded-md text-slate-400 transition-all border border-slate-100"
        >
          <Plus size={14} />
        </button>
      </div>
      
      <div className="space-y-1.5 overflow-y-auto max-h-[80px] custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

function DroppableDraftPanel({ children }: { children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'draft-panel',
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "space-y-3 min-h-[150px] p-2 -mx-2 rounded-xl transition-colors",
        isOver && "bg-emerald-50/50 border-2 border-dashed border-emerald-200"
      )}
    >
      {children}
    </div>
  );
}

// --- Main Component ---

export default function Calendar() {
  const { openTaskModal } = useTaskModal();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => fetchTasks(getToken),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Task> }) => updateTask(id, data, getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const handlePrev = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const goToToday = () => setCurrentDate(new Date());

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const task = active.data.current?.task as Task;
    const dropTargetId = over.id as string;

    if (dropTargetId !== 'draft-panel') {
      const dropDate = parseISO(dropTargetId + 'T12:00:00');
      if (!task.scheduledDate || !isSameDay(parseISO(task.scheduledDate), dropDate)) {
        updateMutation.mutate({ 
          id: taskId, 
          data: { scheduledDate: dropDate.toISOString() } 
        });
      }
    } else if (dropTargetId === 'draft-panel' && task.scheduledDate !== null) {
      updateMutation.mutate({ 
        id: taskId, 
        data: { scheduledDate: null } 
      });
    }
  };

  // Logic for calculating days to show
  let calendarDays: Date[] = [];
  const monthStart = startOfMonth(currentDate);

  if (view === 'month') {
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  } else {
    const startDate = startOfWeek(currentDate);
    const endDate = endOfWeek(currentDate);
    calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  }

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Focus': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Meeting': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Personal': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Work': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Focus': return <Target size={10} />;
      case 'Meeting': return <MoreHorizontal size={10} />;
      case 'Personal': return <User size={10} />;
      case 'Work': return <Briefcase size={10} />;
      default: return <Box size={10} />;
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
          <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {/* Calendar Toolbar */}
            <div className="p-8 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 leading-none mb-2">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <p className="text-sm text-slate-400 font-bold tracking-tight">
                  {view === 'month' ? 'Drop drafts or scheduled items onto any date.' : 'View your focused week ahead.'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="bg-slate-100/50 p-1 rounded-xl flex items-center border border-slate-200">
                  <button 
                    onClick={() => setView('month')}
                    className={cn(
                      "px-4 py-1.5 text-xs font-black rounded-lg transition-all",
                      view === 'month' ? "bg-rose-500 text-white shadow-md shadow-rose-100" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Month
                  </button>
                  <button 
                    onClick={() => setView('week')}
                    className={cn(
                      "px-4 py-1.5 text-xs font-black rounded-lg transition-all",
                      view === 'week' ? "bg-rose-500 text-white shadow-md shadow-rose-100" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Week
                  </button>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={goToToday}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <CalendarIcon size={14} className="text-emerald-500" />
                    Today
                  </button>
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <button onClick={handlePrev} className="p-2 hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-700">
                      <ChevronLeft size={18} />
                    </button>
                    <div className="w-[1px] h-4 bg-slate-200" />
                    <button onClick={handleNext} className="p-2 hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-700">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => openTaskModal()}
                  className="px-5 py-2.5 bg-[#F05D50] text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-[#e04d40] transition-colors shadow-lg shadow-orange-100"
                >
                  <Plus size={18} strokeWidth={3} />
                  New task
                </button>
              </div>
            </div>

            {/* Calendar Grid Header */}
            <div className="grid grid-cols-7 bg-[#FFFBF7] border-b border-slate-200">
              {weekDays.map(day => (
                <div key={day} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 border-collapse">
              {calendarDays.map((day, idx) => {
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isCurrentDay = isToday(day);
                
                const dayTasks = tasks.filter(task => {
                  if (!task.scheduledDate) return false;
                  const taskDate = parseISO(task.scheduledDate);
                  return isSameDay(taskDate, day);
                });

                return (
                  <DroppableDay 
                    key={day.toString()} 
                    day={day} 
                    isCurrentMonth={isCurrentMonth} 
                    isCurrentDay={isCurrentDay} 
                    openTaskModal={openTaskModal}
                  >
                    {dayTasks.map(task => (
                      <DraggableTask 
                        key={task.id} 
                        task={task} 
                        getCategoryColor={getCategoryColor} 
                        getCategoryIcon={getCategoryIcon} 
                      />
                    ))}
                  </DroppableDay>
                );
              })}
            </div>
          </div>

          {/* Draft Task Panel */}
          <div className="w-full xl:w-80 space-y-4">
            <div className="bg-[#E9F5F1] border border-[#D7ECE5] rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-none mb-1.5 tracking-tight">Draft Task Panel</h3>
                  <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-wider">Unscheduled work waits here.</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="bg-white/80 px-2 py-0.5 rounded-lg text-[10px] font-black border border-emerald-100/50">
                    {tasks.filter(t => !t.scheduledDate).length}
                  </span>
                  <Inbox size={16} className="text-slate-300" />
                </div>
              </div>

              <button 
                onClick={() => openTaskModal()}
                className="w-full bg-white border-2 border-dashed border-[#D7ECE5] py-3 rounded-xl text-xs font-black text-rose-500/80 flex items-center justify-center gap-2 hover:bg-white/80 transition-all mb-6 shadow-sm"
              >
                <Plus size={16} strokeWidth={3} />
                Add draft
              </button>

              <DroppableDraftPanel>
                {tasks.filter(t => !t.scheduledDate).map(task => (
                  <div key={`draft-wrap-${task.id}`} className="relative">
                    <DraggableTask 
                      task={task} 
                      getCategoryColor={getCategoryColor} 
                      getCategoryIcon={getCategoryIcon} 
                    />
                  </div>
                ))}

                {tasks.filter(t => !t.scheduledDate).length === 0 && (
                  <div className="bg-white/60 border border-dashed border-[#D7ECE5] rounded-xl p-8 flex flex-col items-center justify-center text-center pointer-events-none">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 shadow-sm mb-3">
                      <Inbox size={20} />
                    </div>
                    <p className="text-xs font-black text-slate-900 mb-1">No drafts waiting</p>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed px-4">
                      Save unscheduled tasks here, then drag them onto a date.
                    </p>
                  </div>
                )}
              </DroppableDraftPanel>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 relative overflow-hidden group shadow-sm">
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
          <button 
            onClick={() => openTaskModal()}
            className="w-14 h-14 bg-[#F05D50] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-200 hover:scale-110 transition-transform"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </DndContext>
  );
}

import React, { useState } from 'react';
import { CheckSquare, Plus, Zap, Battery, BatteryWarning } from 'lucide-react';
import { useTaskModal } from '../context/TaskContext';
import { cn } from '../lib/utils';

type EnergyLevel = 'High' | 'Medium' | 'Low';
type Status = 'Backlog' | 'Deep Focus' | 'Completed';

interface Task {
  id: string;
  title: string;
  energy: EnergyLevel;
  status: Status;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Write Database Schema Migration', energy: 'High', status: 'Backlog' },
  { id: '2', title: 'Reply to support emails', energy: 'Low', status: 'Backlog' },
  { id: '3', title: 'Implement FocusBoard Component', energy: 'Medium', status: 'Deep Focus' },
  { id: '4', title: 'Set up Tailwind config', energy: 'Medium', status: 'Completed' },
];

export default function Tasks() {
  const { openTaskModal } = useTaskModal();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const columns: Status[] = ['Backlog', 'Deep Focus', 'Completed'];

  const getEnergyIcon = (level: EnergyLevel) => {
    switch (level) {
      case 'High': return <Zap size={14} className="text-amber-500" />;
      case 'Medium': return <Battery size={14} className="text-emerald-500" />;
      case 'Low': return <BatteryWarning size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-700 h-full flex flex-col">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <CheckSquare size={18} />
            <span className="text-sm font-medium tracking-tight">Focus Board</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Manage your flow.
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed font-medium">
            Prioritize work based on your current cognitive capacity. Solo tasks, grouped by focus.
          </p>
        </div>
        <button 
          onClick={() => openTaskModal()}
          className="px-5 py-2.5 bg-[#5C4400] text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-[#4a3600] transition-colors shadow-lg shadow-amber-100"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start">
        {columns.map((col) => (
          <div key={col} className="w-80 shrink-0 bg-slate-50/50 border border-slate-100 rounded-[24px] p-4 flex flex-col max-h-full">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-sm font-black text-slate-800">{col}</h3>
              <span className="bg-white border border-slate-200 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-full">
                {tasks.filter(t => t.status === col).length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {tasks.filter(t => t.status === col).map((task) => (
                <div key={task.id} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-grab">
                  <h4 className="text-sm font-bold text-slate-800 mb-3 leading-snug">{task.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-600">
                      {getEnergyIcon(task.energy)}
                      {task.energy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

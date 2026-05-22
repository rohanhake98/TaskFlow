import React from 'react';
import { FolderOpen, Plus, Clock, Target } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Projects() {
  const projects = [
    { id: 1, name: "Flowbase MVP", description: "Build the core personal productivity features.", progress: 65, color: "bg-orange-500" },
    { id: 2, name: "Content Strategy", description: "Draft Q3 blog posts and newsletter pipeline.", progress: 30, color: "bg-indigo-500" },
    { id: 3, name: "Design System Revamp", description: "Update core components to match new brand guidelines.", progress: 10, color: "bg-emerald-500" }
  ];

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 mb-2">
            <FolderOpen size={18} />
            <span className="text-sm font-medium tracking-tight">Projects</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Deep-Work Projects
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed font-medium">
            High-level goals and focused initiatives. Group your tasks here.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm", p.color)}>
                <Target size={24} />
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <Clock size={18} />
              </button>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{p.name}</h3>
            <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">{p.description}</p>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Progress</span>
                <span className="text-[11px] font-black text-slate-700">{p.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all", p.color)} style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

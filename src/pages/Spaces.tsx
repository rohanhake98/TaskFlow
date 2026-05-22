import React from 'react';
import { Layers, Plus, FolderHeart, FolderOpen, Briefcase, GraduationCap, Settings2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Spaces() {
  const spaces = [
    {
      id: 1,
      name: "Personal Brand & Content",
      description: "Everything related to the newsletter, YouTube channel, and blog.",
      icon: FolderHeart,
      color: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-100",
      stats: { projects: 2, notes: 14, boards: 1 }
    },
    {
      id: 2,
      name: "Client Work (Q3)",
      description: "Active contracts and deliverables for the current quarter.",
      icon: Briefcase,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      stats: { projects: 4, notes: 3, boards: 0 }
    },
    {
      id: 3,
      name: "Learning & Research",
      description: "Course notes, book highlights, and exploratory coding projects.",
      icon: GraduationCap,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      stats: { projects: 1, notes: 28, boards: 3 }
    },
    {
      id: 4,
      name: "Life Admin",
      description: "Finance, health tracking, and household management.",
      icon: Settings2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      stats: { projects: 0, notes: 5, boards: 0 }
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Layers size={18} />
            <span className="text-sm font-medium tracking-tight">Spaces</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Your personal domains.
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed font-medium">
            Organize your projects, notes, and tasks into high-level categories to keep your focus sharp.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100">
          <Plus size={18} strokeWidth={3} />
          New Space
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <div 
            key={space.id} 
            className={cn(
              "bg-white border rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden",
              space.border
            )}
          >
            <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 transition-transform group-hover:scale-110", space.bg)} />
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm", space.bg, space.border, space.color)}>
                <space.icon size={24} />
              </div>
              <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-primary group-hover:shadow-sm transition-all">
                <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-black text-slate-900 mb-2">{space.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2 h-10">{space.description}</p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projects</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{space.stats.projects}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-200" />
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notes</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{space.stats.notes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New Card */}
        <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[24px] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[240px] group">
          <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:shadow-sm transition-all mb-4">
            <Plus size={24} />
          </div>
          <h3 className="text-sm font-black text-slate-700 mb-1">Create new space</h3>
          <p className="text-xs text-slate-500 font-medium">Set up a new domain for your work.</p>
        </div>
      </div>
    </div>
  );
}

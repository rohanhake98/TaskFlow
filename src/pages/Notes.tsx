import React, { useState } from 'react';
import { Search, Plus, FileText, MoreHorizontal, Star, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Notes() {
  const [activeNote, setActiveNote] = useState(1);

  const notesList = [
    { id: 1, title: "Productivity System 2026", preview: "The core philosophy is to minimize context switching...", date: "Today", pinned: true },
    { id: 2, title: "Q3 Strategy Thoughts", preview: "Focus on deepening the solo-creator features rather than...", date: "Yesterday", pinned: true },
    { id: 3, title: "Book highlights: Deep Work", preview: "Rule #1: Work Deeply. The capacity to concentrate...", date: "May 18", pinned: false },
    { id: 4, title: "Meeting prep: Design Review", preview: "Need to bring up the contrast ratio on the orange buttons...", date: "May 15", pinned: false },
  ];

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-700 h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6">
      
      {/* Sidebar: Notes List */}
      <div className="w-full md:w-80 lg:w-96 flex flex-col gap-4 h-full shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-indigo-900">
            <FileText size={20} />
            <h1 className="text-2xl font-black tracking-tight">Notes</h1>
          </div>
          <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search notes..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar mt-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">Pinned</p>
          {notesList.filter(n => n.pinned).map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNote(note.id)}
              className={cn(
                "p-4 rounded-2xl cursor-pointer transition-all border",
                activeNote === note.id 
                  ? "bg-indigo-50 border-indigo-100 shadow-sm" 
                  : "bg-white border-transparent hover:border-slate-100 hover:bg-slate-50"
              )}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className={cn("font-bold text-sm line-clamp-1", activeNote === note.id ? "text-indigo-900" : "text-slate-800")}>
                  {note.title}
                </h3>
                <Star size={14} className="text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{note.preview}</p>
              <p className="text-[10px] font-bold text-slate-400">{note.date}</p>
            </div>
          ))}

          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2 mt-6">Recent</p>
          {notesList.filter(n => !n.pinned).map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNote(note.id)}
              className={cn(
                "p-4 rounded-2xl cursor-pointer transition-all border",
                activeNote === note.id 
                  ? "bg-indigo-50 border-indigo-100 shadow-sm" 
                  : "bg-white border-transparent hover:border-slate-100 hover:bg-slate-50"
              )}
            >
              <h3 className={cn("font-bold text-sm line-clamp-1 mb-1", activeNote === note.id ? "text-indigo-900" : "text-slate-800")}>
                {note.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{note.preview}</p>
              <p className="text-[10px] font-bold text-slate-400">{note.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col overflow-hidden relative">
        {/* Editor Header */}
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
             <span className="flex items-center gap-1.5"><Calendar size={14} /> Edited Today at 9:41 AM</span>
             <span className="px-2 py-0.5 bg-slate-100 rounded-md">842 words</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
              <Star size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Editor Content (Mock) */}
        <div className="flex-1 overflow-y-auto px-8 md:px-16 py-12 custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight outline-none" contentEditable suppressContentEditableWarning>
              Productivity System 2026
            </h1>
            
            <div className="prose prose-slate prose-p:font-medium prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-900 focus:outline-none" contentEditable suppressContentEditableWarning>
              <p>The core philosophy is to minimize context switching. As a solo creator, energy management is far more important than time management.</p>
              
              <h2>1. The Rule of Three</h2>
              <p>Every morning, identify no more than three critical tasks. Everything else is a bonus. This prevents the overwhelming feeling of a massive backlog.</p>

              <h2>2. Capture First, Organize Later</h2>
              <p>When an idea strikes, it needs to go into a frictionless inbox. That's what this space is for. Later, during the weekly review, these chaotic thoughts get structured into actionable projects.</p>

              <blockquote>
                "Amateurs sit and wait for inspiration, the rest of us just get up and go to work." - Stephen King
              </blockquote>

              <p>This workspace shouldn't feel like a corporate tool. It needs to feel like a quiet studio.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

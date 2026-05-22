import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, Tag, MessageSquare, Zap, Target, User, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { useTaskModal } from '../../context/TaskContext';
import { cn } from '../../lib/utils';

type Category = 'Focus' | 'Meeting' | 'Personal' | 'Work';
type ItemType = 'Task' | 'Reminder';

export function TaskModal() {
  const { isTaskModalOpen, closeTaskModal, selectedDate } = useTaskModal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [itemType, setItemType] = useState<ItemType>('Task');
  const [category, setCategory] = useState<Category>('Focus');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for scheduling the item
    console.log("Scheduling calendar item:", { title, description, time, itemType, category });
    resetAndClose();
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", { title, description, time, itemType, category });
    resetAndClose();
  };

  const resetAndClose = () => {
    setTitle('');
    setDescription('');
    setTime('');
    setItemType('Task');
    setCategory('Focus');
    closeTaskModal();
  };

  const categories: { id: Category, icon: React.ElementType, color: string }[] = [
    { id: 'Focus', icon: Target, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { id: 'Meeting', icon: MessageSquare, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { id: 'Personal', icon: User, color: 'text-rose-600 bg-rose-50 border-rose-100' },
    { id: 'Work', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  ];

  return (
    <AnimatePresence>
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-slate-100"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create calendar item</h2>
                  <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarIcon size={12} className="text-primary" />
                    Selected date: {selectedDate ? format(selectedDate, 'M/d/yyyy') : format(new Date(), 'M/d/yyyy')}
                  </p>
                </div>
                <button onClick={resetAndClose} className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-2xl transition-all flex items-center gap-2 group">
                  <span className="text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Task title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Write the next thing to remember"
                    autoFocus
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-primary transition-all placeholder:text-slate-400 text-sm"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add helpful context"
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-primary transition-all placeholder:text-slate-400 text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Time */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
                      <Clock size={12} /> Time
                    </label>
                    <input 
                      type="time" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-primary transition-all text-sm appearance-none"
                    />
                  </div>

                  {/* Type */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
                      <Zap size={12} /> Type
                    </label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1 h-[50px]">
                      {(['Task', 'Reminder'] as ItemType[]).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setItemType(type)}
                          className={cn(
                            "flex-1 flex items-center justify-center rounded-xl text-sm font-bold h-full transition-all",
                            itemType === type 
                              ? "bg-white text-slate-900 shadow-sm" 
                              : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
                    <Tag size={12} /> Category
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all gap-2",
                          category === cat.id 
                            ? cn("shadow-md scale-[1.02]", cat.color)
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600"
                        )}
                      >
                        <cat.icon size={18} />
                        <span className="text-[10px] font-black uppercase tracking-wider">{cat.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={handleSaveDraft}
                    className="flex-1 bg-white border-2 border-slate-100 text-slate-600 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm"
                  >
                    Save draft
                  </button>
                  <button 
                    type="submit"
                    className="flex-[1.5] bg-primary text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                  >
                    Schedule
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

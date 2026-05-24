import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, FileText, MoreHorizontal, Star, Calendar, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { fetchNotes, createNote, updateNote, Note } from '../lib/notesApi';
import { format, formatDistanceToNow } from 'date-fns';
import debounce from 'lodash/debounce';

export default function Notes() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch real notes from backend
  const { data: notesList = [], isLoading } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(getToken),
  });

  const activeNote = notesList.find(n => n.id === activeNoteId) || notesList[0];

  const createMutation = useMutation({
    mutationFn: (newNote: Partial<Note>) => createNote(newNote, getToken),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setActiveNoteId(data.id);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Note> }) => updateNote(id, data, getToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // Debounced update function for the editor
  const debouncedUpdate = useCallback(
    debounce((id: string, updates: Partial<Note>) => {
      updateMutation.mutate({ id, data: updates });
    }, 1000),
    []
  );

  const handleCreateNote = () => {
    createMutation.mutate({ title: 'Untitled Note', content: '' });
  };

  const handleTitleChange = (e: React.FormEvent<HTMLHeadingElement>) => {
    if (!activeNote) return;
    const newTitle = e.currentTarget.innerText;
    debouncedUpdate(activeNote.id, { title: newTitle });
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    if (!activeNote) return;
    const newContent = e.currentTarget.innerHTML;
    debouncedUpdate(activeNote.id, { content: newContent });
  };
  
  const handleTogglePin = (e: React.MouseEvent, note: Note) => {
    e.stopPropagation();
    updateMutation.mutate({ id: note.id, data: { isPinned: !note.isPinned } });
  };

  const filteredNotes = notesList.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (n.content || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-700 h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6">
      
      {/* Sidebar: Notes List */}
      <div className="w-full md:w-80 lg:w-96 flex flex-col gap-4 h-full shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-indigo-900">
            <FileText size={20} />
            <h1 className="text-2xl font-black tracking-tight">Notes</h1>
          </div>
          <button 
            onClick={handleCreateNote}
            disabled={createMutation.isPending}
            className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            {createMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} strokeWidth={3} />}
          </button>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar mt-4">
          {filteredNotes.some(n => n.isPinned) && (
            <>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">Pinned</p>
              {filteredNotes.filter(n => n.isPinned).map(note => (
                <div 
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={cn(
                    "p-4 rounded-2xl cursor-pointer transition-all border group",
                    (activeNoteId || notesList[0]?.id) === note.id 
                      ? "bg-indigo-50 border-indigo-100 shadow-sm" 
                      : "bg-white border-transparent hover:border-slate-100 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={cn("font-bold text-sm line-clamp-1", (activeNoteId || notesList[0]?.id) === note.id ? "text-indigo-900" : "text-slate-800")}>
                      {note.title}
                    </h3>
                    <button onClick={(e) => handleTogglePin(e, note)}>
                       <Star size={14} className="text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                    </button>
                  </div>
                  <div 
                    className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3"
                    dangerouslySetInnerHTML={{ __html: note.content || 'No content' }}
                  />
                  <p className="text-[10px] font-bold text-slate-400">{formatDistanceToNow(new Date(note.updatedAt))} ago</p>
                </div>
              ))}
            </>
          )}

          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2 mt-6">Recent</p>
          {filteredNotes.filter(n => !n.isPinned).map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={cn(
                "p-4 rounded-2xl cursor-pointer transition-all border group",
                (activeNoteId || notesList[0]?.id) === note.id 
                  ? "bg-indigo-50 border-indigo-100 shadow-sm" 
                  : "bg-white border-transparent hover:border-slate-100 hover:bg-slate-50"
              )}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className={cn("font-bold text-sm line-clamp-1", (activeNoteId || notesList[0]?.id) === note.id ? "text-indigo-900" : "text-slate-800")}>
                  {note.title}
                </h3>
                <button 
                  onClick={(e) => handleTogglePin(e, note)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Star size={14} className="text-slate-300 hover:text-amber-400 shrink-0 mt-0.5" />
                </button>
              </div>
              <div 
                className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3"
                dangerouslySetInnerHTML={{ __html: note.content || 'No content' }}
              />
              <p className="text-[10px] font-bold text-slate-400">{formatDistanceToNow(new Date(note.updatedAt))} ago</p>
            </div>
          ))}
          
          {filteredNotes.length === 0 && (
            <div className="py-20 text-center opacity-40">
              <Plus size={32} className="mx-auto text-slate-300 mb-4" />
              <p className="text-sm font-bold text-slate-500">No notes found</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Editor Area */}
      {activeNote ? (
        <div className="flex-1 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col overflow-hidden relative">
          {/* Editor Header */}
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
               <span className="flex items-center gap-1.5">
                 <Calendar size={14} /> 
                 Edited {format(new Date(activeNote.updatedAt), 'MMM d, h:mm a')}
               </span>
               {updateMutation.isPending && <span className="flex items-center gap-1.5 text-indigo-500"><Loader2 size={12} className="animate-spin" /> Saving...</span>}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => handleTogglePin(e, activeNote)}
                className={cn("p-2 rounded-xl transition-colors", activeNote.isPinned ? "text-amber-400 bg-amber-50" : "text-slate-400 hover:text-slate-700 hover:bg-slate-50")}
              >
                <Star size={18} fill={activeNote.isPinned ? "currentColor" : "none"} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-y-auto px-8 md:px-16 py-12 custom-scrollbar">
            <div className="max-w-2xl mx-auto space-y-6">
              <h1 
                className="text-4xl font-black text-slate-900 tracking-tight outline-none" 
                contentEditable 
                suppressContentEditableWarning
                onInput={handleTitleChange}
              >
                {activeNote.title}
              </h1>
              
              <div 
                className="prose prose-slate prose-p:font-medium prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-900 focus:outline-none min-h-[400px]" 
                contentEditable 
                suppressContentEditableWarning
                onInput={handleContentChange}
                dangerouslySetInnerHTML={{ __html: activeNote.content || '' }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white border border-slate-100 rounded-[32px] flex items-center justify-center text-center p-12">
          <div className="max-w-xs">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-6">
               <FileText size={32} />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Select a note</h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Choose a note from the sidebar to start writing, or create a new one.
            </p>
            <button 
              onClick={handleCreateNote}
              className="mt-8 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-black shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all"
            >
              Create New Note
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

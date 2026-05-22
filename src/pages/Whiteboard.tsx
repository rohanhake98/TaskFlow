import React, { useRef, useEffect, useState } from 'react';
import { Presentation, MousePointer2, Pen, Eraser, Square, Circle, Type, Download, Share2, Undo2, Redo2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState('pen');

  // Basic drawing functionality
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full container size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        // Fill background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw a subtle dot grid for the "whiteboard" feel
        ctx.fillStyle = '#f1f5f9';
        for (let x = 0; x < canvas.width; x += 20) {
          for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    if (activeTool !== 'pen' && activeTool !== 'eraser') return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'eraser') {
       ctx.strokeStyle = '#ffffff';
       ctx.lineWidth = 20;
    } else {
       ctx.strokeStyle = '#0f172a';
       ctx.lineWidth = 2;
    }
    
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const tools = [
    { id: 'select', icon: MousePointer2 },
    { id: 'pen', icon: Pen },
    { id: 'eraser', icon: Eraser },
    { id: 'square', icon: Square },
    { id: 'circle', icon: Circle },
    { id: 'text', icon: Type },
  ];

  return (
    <div className="h-[calc(100vh-6rem)] w-full flex flex-col bg-slate-50 relative overflow-hidden animate-in fade-in duration-700 rounded-3xl border border-slate-200">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-3 pointer-events-auto">
          <Presentation size={18} className="text-[#5A2A27]" />
          <h1 className="text-sm font-black text-slate-800">Q3 Product Architecture</h1>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">Saved</span>
        </div>
        
        <div className="flex items-center gap-2 pointer-events-auto">
           <button className="p-2 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Undo2 size={16} />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Redo2 size={16} />
          </button>
          <div className="w-[1px] h-6 bg-slate-300 mx-1" />
          <button className="p-2 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} />
          </button>
          <button className="px-4 py-2 bg-[#F05D50] text-white rounded-xl text-xs font-black shadow-lg shadow-orange-100 hover:bg-[#e04d40] transition-colors flex items-center gap-2">
            <Share2 size={14} />
            Share
          </button>
        </div>
      </div>

      {/* Floating Toolbar */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-2 rounded-2xl shadow-lg flex flex-col gap-2">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                activeTool === tool.id 
                  ? "bg-slate-100 text-slate-900 shadow-inner" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <tool.icon size={18} />
            </button>
          ))}
          <div className="h-[1px] w-full bg-slate-200 my-1" />
          <div className="w-8 h-8 rounded-xl bg-[#0f172a] mx-auto border-2 border-slate-200 cursor-pointer" />
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 w-full h-full cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full block"
        />
      </div>
    </div>
  );
}

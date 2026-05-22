import { motion } from "framer-motion";
import { 
  Sparkles, 
  Plus, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Presentation, 
  MessageSquare, 
  Wand2, 
  ArrowRight,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useTaskModal } from "../context/TaskContext";
import { cn } from "../lib/utils";

export default function Dashboard() {
  const { user } = useUser();
  const { openTaskModal } = useTaskModal();
  const userName = user?.firstName || user?.fullName || "Solo Creator";

  // Semantic Pastel Palette from Documentation
  const moduleCards = [
    { 
      label: "Calendar", 
      stat: "0 upcoming items", 
      subStat: "0 drafts saved", 
      icon: Calendar, 
      color: "text-[#1E4620]", 
      bg: "bg-[#E6F4EA]", 
      border: "border-[#B7E1CD]",
      badgeBg: "bg-[#B7E1CD]/30",
      badgeText: "text-[#1E4620]",
      path: "/calendar"
    },
    { 
      label: "Kanban / Tasks", 
      stat: "0 tasks", 
      subStat: "0 completeds across 0 bo...", 
      icon: CheckSquare, 
      color: "text-[#5C4400]", 
      bg: "bg-[#FFF4CC]", 
      border: "border-[#FFE08A]",
      badgeBg: "bg-[#FFE08A]/30",
      badgeText: "text-[#5C4400]",
      path: "/tasks"
    },
    { 
      label: "Notes", 
      stat: "0 notes", 
      subStat: "0 pinned notes ready", 
      icon: FileText, 
      color: "text-[#1D3A5F]", 
      bg: "bg-[#E7F0FB]", 
      border: "border-[#B6D4F7]",
      badgeBg: "bg-[#B6D4F7]/30",
      badgeText: "text-[#1D3A5F]",
      path: "/notes"
    },
    { 
      label: "Whiteboard", 
      stat: "0 boards", 
      subStat: "Canvas ready", 
      icon: Presentation, 
      color: "text-[#5A2A27]", 
      bg: "bg-[#FDEAE7]", 
      border: "border-[#F5C6BE]",
      badgeBg: "bg-[#F5C6BE]/30",
      badgeText: "text-[#5A2A27]",
      path: "/whiteboard"
    },
    { 
      label: "AI Assistant", 
      stat: "0 actions", 
      subStat: "Today", 
      icon: MessageSquare, 
      color: "text-[#3B2E66]", 
      bg: "bg-[#F0E9FF]", 
      border: "border-[#D4C2FF]",
      badgeBg: "bg-[#D4C2FF]/30",
      badgeText: "text-[#3B2E66]",
      path: "/ai-assistant"
    },
    { 
      label: "AI Builder", 
      stat: "0 templates", 
      subStat: "0 sidebar apps pinned", 
      icon: Wand2, 
      color: "text-[#5A1E24]", 
      bg: "bg-[#FDECEF]", 
      border: "border-[#F5C2C7]",
      badgeBg: "bg-[#F5C2C7]/30",
      badgeText: "text-[#5A1E24]",
      path: "/builder"
    },
  ];

  const quickAccess = [
    { title: "Create Task", desc: "Open your Kanban workspace.", icon: Plus, color: "text-[#5C4400]", bg: "bg-[#FFF4CC]", path: "/tasks" },
    { title: "Add Calendar Rem...", desc: "Schedule a task or reminder.", icon: Calendar, color: "text-[#1E4620]", bg: "bg-[#E6F4EA]", path: "/calendar" },
    { title: "Create Note", desc: "Capture a fresh thought.", icon: FileText, color: "text-[#1D3A5F]", bg: "bg-[#E7F0FB]", path: "/notes" },
    { title: "Open Whiteboard", desc: "Sketch ideas visually.", icon: Presentation, color: "text-[#5A2A27]", bg: "bg-[#FDEAE7]", path: "/whiteboard" },
    { title: "Ask AI Assistant", desc: "Plan or act across the app.", icon: MessageSquare, color: "text-[#3B2E66]", bg: "bg-[#F0E9FF]", path: "/ai-assistant" },
    { title: "Generate AI Templ...", desc: "Build a mini productivity app.", icon: Wand2, color: "text-[#5A1E24]", bg: "bg-[#FDECEF]", path: "/builder" },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Card */}
      <section className="bg-white/40 border border-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-sm backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-300 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-amber-200 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Sparkles size={16} fill="currentColor" />
              <span className="font-black uppercase tracking-[0.2em] text-[10px]">Dashboard</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-700 tracking-tight mb-4">
              Welcome back, {userName}.
            </h1>
            <p className="text-sm text-slate-500 font-bold max-w-lg leading-relaxed mb-8">
              Your workspace is awake: tasks, calendar, pages, and AI work are gathered here for a clear start.
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => openTaskModal()}
                className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all flex items-center gap-2"
              >
                <Plus size={18} strokeWidth={3} />
                <span>New task</span>
              </button>
              <Link to="/calendar" className="bg-white text-slate-700 border-2 border-slate-100 px-6 py-2.5 rounded-xl text-sm font-black hover:bg-slate-50 transition-all flex items-center gap-2">
                <Calendar size={18} />
                <span>Calendar</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white/80 border border-slate-50 p-5 rounded-2xl w-24 shadow-sm text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tasks</p>
              <p className="text-2xl font-black text-slate-700">0</p>
            </div>
            <div className="bg-white/80 border border-slate-50 p-5 rounded-2xl w-32 shadow-sm text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Complete</p>
              <p className="text-2xl font-black text-slate-700">0%</p>
            </div>
            <div className="bg-white/80 border border-slate-50 p-5 rounded-2xl w-24 shadow-sm text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Upcoming</p>
              <p className="text-2xl font-black text-slate-700">0</p>
            </div>
          </div>
        </div>
      </section>

      {/* Module Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {moduleCards.map((module, i) => (
          <Link key={i} to={module.path}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn("border h-full rounded-[1.75rem] p-5 shadow-sm hover:shadow-md transition-all group relative", module.bg, module.border)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border", module.bg, module.border)}>
                  <module.icon size={18} className={module.color} />
                </div>
                <div className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest", module.badgeBg, module.badgeText)}>
                  Ready
                </div>
              </div>
              <div>
                <h3 className="text-[12px] font-bold text-slate-400 mb-1.5 leading-tight">{module.label}</h3>
                <p className="text-lg font-black tracking-tight leading-none mb-1.5" style={{ color: "var(--slate-700)" }}>
                  <span className={module.color}>{module.stat.split(' ')[0]}</span>
                  <span className="text-slate-400 ml-1.5 font-bold">{module.stat.split(' ').slice(1).join(' ')}</span>
                </p>
                <p className="text-[9px] text-slate-400 font-bold uppercase truncate">{module.subStat}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Quick Access Section */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-orange-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={16} />
            </div>
            <h2 className="text-lg font-black text-slate-700 tracking-tight">Quick access</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickAccess.map((item, i) => {
              const isCreateTask = item.title === "Create Task";
              
              return isCreateTask ? (
                <button 
                  key={i} 
                  onClick={() => openTaskModal()}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all group flex items-start gap-3.5 text-left w-full"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm", item.bg, item.color)}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-700 text-[13px] mb-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </button>
              ) : (
                <Link key={i} to={item.path} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all group flex items-start gap-3.5">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm", item.bg, item.color)}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-700 text-[13px] mb-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Task Summary Section */}
        <div className="space-y-5">
          <div className="bg-white border border-slate-100 rounded-[2.25rem] p-7 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center text-primary">
                <Clock size={16} />
              </div>
              <h3 className="text-base font-black text-slate-700 tracking-tight">Task summary</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1 mb-8">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                <p className="text-xl font-black text-slate-700">0</p>
              </div>
              <div className={cn("bg-emerald-50/30 border border-emerald-50 p-4 rounded-2xl text-center")}>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Completed</p>
                <p className="text-xl font-black text-slate-700">0</p>
              </div>
              <div className="bg-amber-50/30 border border-amber-50 p-4 rounded-2xl text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</p>
                <p className="text-xl font-black text-slate-700">0</p>
              </div>
              <div className="bg-rose-50/30 border border-rose-50 p-4 rounded-2xl text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Overdue</p>
                <p className="text-xl font-black text-slate-700">0</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[12px] font-black text-slate-700">Progress</p>
                <p className="text-[12px] font-black text-slate-400">0%</p>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

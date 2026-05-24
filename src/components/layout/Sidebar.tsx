import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Presentation, 
  Layers, 
  Wand2, 
  Settings, 
  Sparkles, 
  X, 
  Search,
  ChevronLeft,
  MoreVertical,
  ChevronRight,
  User as UserIcon
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { cn } from "../../lib/utils";

const menuGroups = [
  {
    title: "Home",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: MessageSquare, label: "AI Assistant", path: "/ai-assistant" },
    ]
  },
  {
    title: "Workspace",
    items: [
      { icon: Calendar, label: "Calendar", path: "/calendar" },
      { icon: CheckSquare, label: "Task / Kanban", path: "/tasks" },
      { icon: FileText, label: "Notes", path: "/notes" },
      { icon: Presentation, label: "Whiteboard", path: "/whiteboard" },
      { icon: Layers, label: "Pages / Spaces", path: "/spaces" },
    ]
  },
  {
    title: "Build",
    items: [
      { icon: Wand2, label: "AI Template Builder", path: "/builder" },
      { icon: Settings, label: "Settings", path: "/profile" },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useUser();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 lg:static",
        isOpen 
          ? "translate-x-0 lg:ml-0" 
          : "-translate-x-full lg:-ml-72 lg:opacity-0"
      )}>
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
                <Sparkles size={20} fill="currentColor" />
              </div>
              <div>
                <h1 className="text-lg font-black text-slate-900 leading-none">Flowbase</h1>
                <p className="text-[11px] text-slate-400 font-bold mt-1">Cozy workspace</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search everything"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto no-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                      isActive 
                        ? "bg-orange-50 text-primary border border-orange-100 shadow-sm" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon size={18} className={cn("transition-transform group-hover:scale-110")} />
                    <span className="font-bold text-[13px] tracking-tight">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Profile / Workspace Switcher */}
        <div className="p-4 mt-auto">
          <Link 
            to="/profile" 
            onClick={onClose}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-indigo-100 border-2 border-white" 
                  alt="Profile" 
                />
              ) : (
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <UserIcon size={20} />
                </div>
              )}
              <div>
                <p className="text-[13px] font-black text-slate-900 leading-none">
                  {user?.firstName ? `${user.firstName}'s Space` : "Personal Space"}
                </p>
                <p className="text-[10px] text-emerald-500 font-bold mt-1.5 uppercase tracking-wider">
                  Focus Mode Active
                </p>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}

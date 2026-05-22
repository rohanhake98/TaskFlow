import { Search, Bell, User, Menu } from "lucide-react";

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <header className="h-16 border-b border-slate-100 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 lg:hidden transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg w-64 lg:w-80 group focus-within:ring-2 focus-within:ring-orange-100 focus-within:bg-white transition-all">
          <Search size={16} className="text-slate-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full border border-white" />
        </button>
        
        <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden xs:block" />
        
        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-none">Alex Rivera</p>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">Free Plan</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-primary overflow-hidden hover:bg-orange-100 transition-colors cursor-pointer">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}

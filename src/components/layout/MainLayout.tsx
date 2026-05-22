import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { TaskModal } from "../ui/TaskModal";
import { cn } from "../../lib/utils";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Optional: listen for resize if you want it to auto-open/close
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#FFFBF7] font-sans selection:bg-orange-100 selection:text-orange-900 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Toggle Button */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-40 p-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all group"
          >
            <Menu className="w-6 h-6 text-slate-500 group-hover:text-primary" />
          </button>
        )}

        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto scroll-smooth">
          <div className="max-w-[1600px] mx-auto pb-20">
            {children}
          </div>
        </main>
      </div>
      <TaskModal />
    </div>
  );
}

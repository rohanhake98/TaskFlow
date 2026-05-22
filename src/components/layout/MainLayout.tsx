import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FFFBF7] font-sans selection:bg-orange-100 selection:text-orange-900 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Mobile Menu Toggle (only visible on small screens) */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden absolute top-4 left-4 z-40 p-2 bg-white rounded-xl shadow-sm border border-slate-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>

        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto scroll-smooth">
          <div className="max-w-[1600px] mx-auto pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function PublicNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-200">
            <Sparkles size={18} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">Flowbase</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/solutions" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Solutions</Link>
          <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Pricing</Link>
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Features</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Log in</Link>
          <Link to="/dashboard" className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

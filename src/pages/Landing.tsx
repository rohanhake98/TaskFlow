import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, CheckCircle2, Zap, Shield, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-orange-50 text-primary text-xs font-bold rounded-full uppercase tracking-widest mb-6">
              AI-First Productivity
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8">
              Your workflow, at the speed of <span className="text-primary italic">thought.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Flowbase is the AI-first workspace designed for solo creators who want to stay in flow and accomplish more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group">
                Start building for free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all">
                Book a demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[2.5rem] blur opacity-20" />
            <div className="relative bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden p-4">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3" 
                alt="Dashboard Preview" 
                className="rounded-2xl w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything <span className="text-primary italic">you need</span> to grow.
            </h2>
            <p className="text-slate-500 font-medium">Built for solo creators and high-velocity individuals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "AI Extraction", desc: "Instantly turn your ideas and notes into actionable tasks." },
              { icon: CheckCircle2, title: "Smart Kanban", desc: "A task board that prioritizes work based on your specific deadlines." },
              { icon: Users, title: "Deep Work Mode", desc: "Distraction-free environment optimized for your creative flow." },
              { icon: Shield, title: "Enterprise Security", desc: "Your data is encrypted and protected with industry-leading standards." },
              { icon: Sparkles, title: "Predictive Analytics", desc: "Know when you'll finish projects before you even start them." },
              { icon: ArrowRight, title: "Deep Integration", desc: "Connect with Slack, GitHub, and Figma in just a few clicks." },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white">
              <Sparkles size={12} fill="currentColor" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Flowbase</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Flowbase Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

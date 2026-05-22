import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Briefcase, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export default function Solutions() {
  const solutions = [
    {
      title: "For Freelancers",
      icon: Briefcase,
      desc: "Manage your clients, deadlines, and creative projects in one private workspace. AI-powered task extraction keeps you focused on creating.",
      features: ["Unlimited Projects", "AI Task Suggestion", "Time Tracking", "Personal Invoicing"],
      color: "bg-orange-50",
      text: "text-orange-600"
    },
    {
      title: "For Students",
      icon: GraduationCap,
      desc: "Stay on top of assignments and study schedules. Flowbase AI helps you break down complex subjects into manageable daily tasks.",
      features: ["Assignment Tracker", "Study Focus Mode", "AI Note Summaries", "Deadline Reminders"],
      color: "bg-amber-50",
      text: "text-amber-600"
    },
    {
      title: "For Personal Growth",
      icon: Zap,
      desc: "Achieve your personal goals with clarity. Track habits, plan your day, and let your AI coach keep you accountable to your vision.",
      features: ["Habit Tracking", "Daily Planning", "AI Goal Coaching", "Focus Analytics"],
      color: "bg-emerald-50",
      text: "text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
          >
            Built for your <span className="text-primary italic">personal flow.</span>
          </motion.h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Flowbase adapts to your unique goals, helping you accomplish more with less friction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform", s.color, s.text)}>
                <s.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {s.desc}
              </p>
              <ul className="space-y-4 mb-10">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link 
                to="/dashboard" 
                className="flex items-center justify-between w-full p-4 bg-slate-50 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all font-bold"
              >
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

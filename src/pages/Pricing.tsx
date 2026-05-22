import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Zap, Shield, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export default function Pricing() {
  const plans = [
    {
      name: "Personal",
      price: "0",
      desc: "Perfect for solo creators just starting out.",
      features: ["5 Projects", "Basic AI Chat", "Community Support", "1 GB Storage"],
      buttonText: "Current Plan",
      featured: false
    },
    {
      name: "Pro",
      price: "999",
      desc: "Ideal for power users and solo professionals.",
      features: ["Unlimited Projects", "Advanced AI Coach", "Priority Support", "10 GB Storage", "API Access"],
      buttonText: "Upgrade to Pro",
      featured: true
    },
    {
      name: "Lifetime",
      price: "9999",
      desc: "One-time payment for perpetual focus.",
      features: ["All Pro Features", "Early Beta Access", "Exclusive Themes", "Unlimited Storage", "Lifetime Updates"],
      buttonText: "Get Lifetime Access",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
          >
            Simple, transparent <span className="text-primary italic">pricing.</span>
          </motion.h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Choose the plan that fits your ambition. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative bg-white border rounded-[2.5rem] p-8 transition-all flex flex-col",
                plan.featured 
                  ? "border-primary shadow-2xl shadow-orange-100 scale-105 z-10" 
                  : "border-slate-100 shadow-sm hover:shadow-md"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{plan.desc}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900">₹{plan.price}</span>
                <span className="text-slate-400 font-bold">{plan.name === "Lifetime" ? "/once" : "/month"}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                to="/dashboard" 
                className={cn(
                  "w-full py-4 rounded-2xl text-center font-bold transition-all shadow-lg",
                  plan.featured 
                    ? "bg-primary text-white shadow-orange-200 hover:bg-orange-600" 
                    : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
                )}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section Preview */}
        <div className="max-w-3xl mx-auto bg-slate-50 rounded-[2.5rem] p-10 text-center">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
            <HelpCircle size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Have questions?</h3>
          <p className="text-slate-500 mb-8 font-medium">We're here to help you choose the right path for your journey.</p>
          <button className="text-primary font-bold flex items-center gap-2 mx-auto hover:underline">
            Visit Help Center <Zap size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

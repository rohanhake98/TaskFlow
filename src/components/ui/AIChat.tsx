import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, User, Paperclip, Smile, MoreHorizontal, Zap, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hi! I'm Flow AI. I've analyzed your workspace. How can I help you optimize your workflow today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageContent = text || input;
    if (!messageContent.trim()) return;

    const userMsg = { 
      role: "user", 
      content: messageContent,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    if (!text) setInput("");
    
    setIsTyping(true);
    
    // Mock response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I've updated your schedule. Based on your current progress, you should focus on finishing the 'Brand Guidelines' project. Would you like me to set a reminder?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  const suggestions = [
    { icon: Zap, label: "Summarize day", prompt: "Give me a summary of my tasks for today." },
    { icon: Clock, label: "Check deadlines", prompt: "Are there any projects due this week?" },
    { icon: Calendar, label: "Plan tomorrow", prompt: "Help me plan my schedule for tomorrow." },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-[420px] h-[650px] bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200 relative">
                  <Sparkles size={24} fill="currentColor" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-none">Flow AI</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 bg-orange-50 text-[10px] font-bold text-primary rounded-full uppercase tracking-widest">
                      Dashboard Context
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/20 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex flex-col gap-1.5 max-w-[85%]",
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-sm",
                      msg.role === "assistant" ? "bg-white text-orange-600 border border-slate-100" : "bg-slate-900 text-white"
                    )}>
                      {msg.role === "assistant" ? <Sparkles size={14} /> : <User size={14} />}
                    </div>
                    <div className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.role === "assistant" 
                        ? "bg-white text-slate-700 border border-slate-100 rounded-tl-none" 
                        : "bg-orange-600 text-white rounded-tr-none"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold px-11 uppercase tracking-tight">
                    {msg.time}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center shadow-sm">
                    <Sparkles size={14} className="text-orange-600" />
                  </div>
                  <div className="flex gap-1 p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Actions */}
            <div className="px-6 py-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s.prompt)}
                  className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all whitespace-nowrap"
                >
                  <s.icon size={12} />
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400">
                  <button className="hover:text-slate-600 transition-colors">
                    <Paperclip size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Flow AI anything..."
                  className="w-full pl-12 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-[1.25rem] text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Smile size={18} />
                  </button>
                  <button 
                    onClick={() => handleSend()}
                    className="p-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-md shadow-orange-100"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
                AI can make mistakes • Free Plan
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden",
          isOpen ? "bg-slate-900 text-white" : "bg-orange-600 text-white hover:bg-orange-700"
        )}
      >
        {!isOpen && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        )}
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
}

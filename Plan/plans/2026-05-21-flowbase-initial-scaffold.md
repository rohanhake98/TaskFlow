
# Flowbase Initial Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the initial UI layout and theme for the Flowbase AI Productivity SaaS, featuring a Claude-inspired aesthetic.

**Architecture:** A responsive layout with a persistent sidebar for navigation, a central content area for views, and a floating, interactive AI chat panel.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Framer Motion.

---

### Task 1: Configure Tailwind Theme

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update Tailwind configuration with Flowbase color palette**

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F97316", // Flowbase Orange
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFF7ED", // Light Orange tint
          foreground: "#0F172A",
        },
        muted: {
          DEFAULT: "#64748B",
          foreground: "#F1F5F9",
        },
        accent: {
          DEFAULT: "#F97316",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: configure tailwind theme for Flowbase"
```

### Task 2: Create Main Layout Components

**Files:**
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/MainLayout.tsx`

- [ ] **Step 1: Create Sidebar component**

```tsx
import { LayoutDashboard, FolderCanvas, CheckSquare, Users, MessageSquare } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FolderCanvas, label: "Projects", path: "/projects" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: Users, label: "Team", path: "/team" },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-secondary h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Flowbase</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-orange-100 text-slate-700 hover:text-primary transition-colors"
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 2: Create MainLayout component**

```tsx
import { Sidebar } from "./Sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Sidebar.tsx src/components/layout/MainLayout.tsx
git commit -m "feat: add Sidebar and MainLayout components"
```

### Task 3: Implement Dashboard View

**Files:**
- Create: `src/pages/Dashboard.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Dashboard page with mock stats**

```tsx
export function Dashboard() {
  const stats = [
    { label: "Active Projects", value: "12", trend: "+2 this week" },
    { label: "Pending Tasks", value: "48", trend: "15 high priority" },
    { label: "Team Velocity", value: "85%", trend: "+5% from last month" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, User</h2>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-primary mt-1">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">No recent activity to show.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update App.tsx to use MainLayout and Dashboard**

```tsx
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default App;
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Dashboard.tsx src/App.tsx
git commit -m "feat: implement Dashboard view and update App layout"
```

### Task 4: Add Floating AI Chat UI

**Files:**
- Create: `src/components/ui/AIChat.tsx`
- Modify: `src/components/layout/MainLayout.tsx`

- [ ] **Step 1: Create AIChat UI component**

```tsx
import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 h-96 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-secondary rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="font-semibold">Flow AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-orange-50 p-3 rounded-lg text-sm text-slate-700">
                Hi! I'm your Flowbase assistant. How can I help you today?
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Add AIChat to MainLayout**

```tsx
import { Sidebar } from "./Sidebar";
import { AIChat } from "../ui/AIChat";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
        <AIChat />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/AIChat.tsx src/components/layout/MainLayout.tsx
git commit -m "feat: add floating AI Chat interface"
```

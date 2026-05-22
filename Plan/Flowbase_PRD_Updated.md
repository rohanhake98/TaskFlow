# Flowbase - AI Personal Productivity Workspace

## Design Philosophy (Personal Edition)
Focus on **"Flow"** and **"Deep Work."** The interface should feel like a private study or a focused digital office, not a corporate communication tool.

---

## 01. PRD (Product Requirements Document)
**App Name:** Flowbase
**Tagline:** AI-First Personal Productivity for Solo Creators.
**Problem:** Existing productivity tools are built for teams, leading to "feature bloat" that distracts individual users. Solo creators need a tool that understands *their* specific focus and deep-work habits.

**Core Features (Must Have):**
- **Personal Dashboard:** High-fidelity overview of your focus, energy, and progress.
- **Project & Task Management:** Simple, powerful CRUD for individual goals.
- **Personal AI Assistant:** A productivity partner that remembers your context and helps you stay in flow.
- **Responsive, Minimalist UI:** Optimized for single-user efficiency.

**Out of Scope:**
- Team Collaboration (No shared boards, no multi-user editing).
- Advanced Permissions (Owner-only access).
- Public Project Sharing.

---

## 02. UI/UX Design System (Claude Inspired)
- **Primary Background:** #FFFFFF (Focus)
- **Secondary Background:** #FFF7ED (Calm)
- **Primary Accent:** #F97316 (Energy)
- **Radius:** 12px (Softness)
- **Typography:** Inter (Sans-serif), bold headings, medium-weight body.

### Design Principles
- Minimal and distraction-free.
- Clean spacing and soft shadows.
- Focus on readability and hierarchy.
- Subtle orange highlights for actions.

---

## 03. Core User Experience
- **Solo First:** Every feature is built for the individual. No "shared," "team," or "collaborative" nomenclature.
- **AI as a Coach:** The AI doesn't just manage tasks; it understands your personal energy, goals, and habits.
- **Minimalist Friction:** One-click task entry, zero-clutter navigation.

---

## 04. Technical Stack
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS.
- **Components:** Shadcn/UI, Lucide, Framer Motion.
- **Backend:** Supabase (Auth, DB, Real-time).
- **Deployment:** Vercel.

# Flowbase Master Implementation Plan (Personal Edition)

This document serves as the "Source of Truth" for the Flowbase project, optimized for **Personal Productivity** and **Solo Creators**.

---

## 01. PRD (Product Requirements Document)
**App Name:** Flowbase
**Tagline:** AI-First Personal Productivity for Solo Creators.
**Problem:** Existing productivity tools are built for teams, leading to "feature bloat" that distracts individual users. Solo creators need a tool that understands *their* specific focus and deep-work habits.
**Core Features (Must Have):**
- **Personal Dashboard:** Real-time stats focused on individual progress and habits.
- **Deep-Work Projects:** Project and Task management (CRUD) without team overhead.
- **Personal AI Coach:** AI Assistant (Claude-inspired) that remembers your personal context and goals.
- **Distraction-Free UI:** Clean, minimalist, and optimized for individual flow.
**Out of Scope:**
- Team Collaboration (No shared boards, no multi-user editing).
- Permission Systems (Simple user-only access).
- Public Project Sharing.

---

## 02. TRD (Technical Requirements Document)
**Frontend:** React 18 (Vite), TypeScript, Tailwind CSS.
**UI Components:** Shadcn/UI, Lucide Icons, Framer Motion.
**State Management:** React Context + TanStack Query.
**Backend:** Node.js (Express) or Supabase.
**Database:** PostgreSQL.
**Auth:** Simple User Auth (Email/Social).
**Hosting:** Vercel (Frontend), Railway/Supabase (Backend).

---

## 03. App Flow (User Journey)
1. **Unauthenticated:** Landing Page -> Login/Signup.
2. **Authenticated:**
   - **Dashboard (Default):** Personal overview of focus areas and daily tasks.
   - **Focus View:** Simplified project management for solo goals.
   - **Task Board:** Personal Kanban/List view of tasks.
   - **Personal AI Chat:** Your productivity partner, available globally.

---

## 04. UI/UX Design Brief
**Aesthetic:** "Claude-Inspired" — Clean, white-space heavy, minimal.
**Color Palette:**
- Background: `#FFFFFF`
- Sidebar/Secondary: `#FFF7ED` (Light Orange)
- Accent: `#F97316` (Flowbase Orange)
- Text: `#0F172A`
**Typography:** Inter (Sans-serif).
**Radius:** `12px` (rounded-xl) for a softer, personal feel.

---

## 05. Backend Schema (Simplified)
- **users:** `id, email, full_name, avatar_url, preferences (JSONB), created_at`
- **projects:** `id, user_id, name, description, priority, deadline, created_at`
- **tasks:** `id, project_id, user_id, title, status, due_date, energy_level (low/med/high)`
- **ai_memories:** `id, user_id, context_summary, key_goals, last_updated`

---

## 06. Step-by-Step Implementation Plan

### Phase 1: Foundation & Layout (Personal Focus)
- [x] Task 1.1: Configure Tailwind with Flowbase theme.
- [x] Task 1.2: Build Responsive `MainLayout` with `Sidebar` and `TopNav`.
- [x] Task 1.3: Implement `AIChat` UI component.
- [ ] Task 1.4: Refactor to remove all "Team" references and views.

### Phase 2: Core Views (Solo Workflow)
- [ ] Task 2.1: Implement Personal `Dashboard` with focus-tracking stats.
- [ ] Task 2.2: Build `ProjectManager` for individual goals.
- [ ] Task 2.3: Build `FocusBoard` (Simple Task management).

### Phase 3: AI Integration (Coach Mode)
- [ ] Task 3.1: Connect `AIChat` to mock personal context service.
- [ ] Task 3.2: Implement "Deep Work Suggestion" logic.

### Phase 4: Backend & Auth
- [ ] Task 4.1: Set up simplified Database Schema.
- [ ] Task 4.2: Implement User Authentication.
- [ ] Task 4.3: Connect frontend to live personal data.

### Phase 5: Polish & Deployment
- [ ] Task 5.1: Add smooth motion transitions.
- [ ] Task 5.2: Final mobile audit (PWA focus).
- [ ] Task 5.3: Deploy.

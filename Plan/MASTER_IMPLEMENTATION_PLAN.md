# Flowbase Master Implementation Plan

This document serves as the "Source of Truth" for the Flowbase project, following the **Vibe Coding** methodology.

---

## 01. PRD (Product Requirements Document)
**App Name:** Flowbase
**Tagline:** AI-First Productivity for Creators and Teams.
**Problem:** Existing productivity tools are either too complex or lack integrated AI that actually understands the user's workflow.
**Core Features (Must Have):**
- Minimalist Dashboard with real-time stats.
- Project and Task Management (CRUD).
- Persistent AI Chat Assistant (Claude-inspired).
- Responsive, distraction-free UI.
**Out of Scope:**
- Native Mobile Apps (v1 will be PWA/Web only).
- Advanced Team Permissions (v1: Owner/Member only).

---

## 02. TRD (Technical Requirements Document)
**Frontend:** React 18 (Vite), TypeScript, Tailwind CSS.
**UI Components:** Shadcn/UI, Lucide Icons, Framer Motion.
**State Management:** React Context + TanStack Query.
**Backend:** Node.js (Express) or Supabase (for rapid v1 development).
**Database:** PostgreSQL.
**Auth:** Supabase Auth or JWT-based.
**Hosting:** Vercel (Frontend), Railway/Supabase (Backend).

---

## 03. App Flow (User Journey)
1. **Unauthenticated:** Landing Page -> Login/Signup.
2. **Authenticated:**
   - **Dashboard (Default):** High-level overview of projects and tasks.
   - **Project View:** Detailed list of projects with status filters.
   - **Task Board:** Kanban/List view of tasks within a project.
   - **Global AI Chat:** Accessible from any screen via a floating toggle.

---

## 04. UI/UX Design Brief
**Aesthetic:** "Claude-Inspired" — Clean, white-space heavy, minimal.
**Color Palette:**
- Background: `#FFFFFF`
- Sidebar/Secondary: `#FFF7ED` (Light Orange)
- Accent: `#F97316` (Flowbase Orange)
- Text: `#0F172A`
**Typography:** Inter (Sans-serif).
**Radius:** `8px` (rounded-md).

---

## 05. Backend Schema
- **users:** `id, email, full_name, avatar_url, created_at`
- **projects:** `id, user_id, name, description, status, created_at`
- **tasks:** `id, project_id, user_id, title, priority, status, due_date`
- **chat_sessions:** `id, user_id, history (JSONB), last_updated`

---

## 06. Step-by-Step Implementation Plan

### Phase 1: Foundation & Layout
- [ ] Task 1.1: Configure Tailwind with Flowbase theme (Colors, Radius).
- [ ] Task 1.2: Build Responsive `MainLayout` with `Sidebar` and `TopNav`.
- [ ] Task 1.3: Implement `AIChat` UI component (Floating/Collapsible).

### Phase 2: Core Views & Logic
- [ ] Task 2.1: Implement `Dashboard` with mock data and stats cards.
- [ ] Task 2.2: Build `ProjectList` and `ProjectDetail` views.
- [ ] Task 2.3: Build `TaskBoard` (Kanban style).

### Phase 3: AI Integration
- [ ] Task 3.1: Connect `AIChat` UI to a mock API service.
- [ ] Task 3.2: Implement "Task Extraction" logic (AI suggests tasks from chat).

### Phase 4: Backend & Auth
- [ ] Task 4.1: Set up Database Schema and Supabase/Node.js connection.
- [ ] Task 4.2: Implement Authentication (Signup/Login).
- [ ] Task 4.3: Connect Frontend views to live Database.

### Phase 5: Polish & Deployment
- [ ] Task 5.1: Add Framer Motion transitions across pages.
- [ ] Task 5.2: Final Mobile Responsiveness audit.
- [ ] Task 5.3: Deploy to Vercel/Production.

---
> **Note:** For specific code-level tasks, refer to the individual plan files in `Plan/plans/`.

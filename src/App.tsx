import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AIChat } from "./components/ui/AIChat";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Landing from "./pages/Landing";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";

// Placeholder components for other routes
const AICoach = () => <div className="p-8 text-center text-slate-500 font-bold">AI Assistant Coach (Coming Soon)</div>;
const Whiteboard = () => <div className="p-8 text-center text-slate-500 font-bold">Creative Whiteboard (Coming Soon)</div>;
const Spaces = () => <div className="p-8 text-center text-slate-500 font-bold">Personal Spaces (Coming Soon)</div>;
const Builder = () => <div className="p-8 text-center text-slate-500 font-bold">AI Template Builder (Coming Soon)</div>;
const Settings = () => <div className="p-8 text-center text-slate-500 font-bold">User Settings (Coming Soon)</div>;

// Component to wrap authenticated routes with the main layout
const AppLayout = () => (
  <MainLayout>
    <Outlet />
    <AIChat />
  </MainLayout>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Shared Navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>

        {/* Authenticated App Routes with Sidebar/TopNav */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-assistant" element={<AICoach />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

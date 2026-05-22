import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { MainLayout } from "./components/layout/MainLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AIChat } from "./components/ui/AIChat";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Whiteboard from "./pages/Whiteboard";
import Spaces from "./pages/Spaces";
import Landing from "./pages/Landing";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// Placeholder components for other routes
const AICoach = () => <div className="p-8 text-center text-slate-500 font-bold">AI Assistant Coach (Coming Soon)</div>;
const Builder = () => <div className="p-8 text-center text-slate-500 font-bold">AI Template Builder (Coming Soon)</div>;

// Component to wrap authenticated routes with the main layout
const AppLayout = () => (
  <MainLayout>
    <Outlet />
    <AIChat />
  </MainLayout>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </>
  );
};

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>
      <SignedOut>
        {children}
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Shared Navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          } />
        </Route>

        {/* Authenticated App Routes with Sidebar/TopNav */}
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/ai-assistant" element={<AICoach />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

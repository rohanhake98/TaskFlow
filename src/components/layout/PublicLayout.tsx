import { Outlet } from "react-router-dom";
import { PublicNav } from "./PublicNav";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

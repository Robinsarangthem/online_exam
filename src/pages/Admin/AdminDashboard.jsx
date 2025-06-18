import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

//admin dashboard page for online mcq exam
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard";
  });

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 pt-3 min-h-0">
        <aside className="w-64 flex-shrink-0">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-10">
          <div className="p-4 md:p-8 lg:p-12 min-h-full">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

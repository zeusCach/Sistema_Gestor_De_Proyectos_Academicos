import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./NavBar";
import { RecentProjects } from "./RecentProjects";
import { Sidebar } from "./SideBar";
import { StatCard } from "./StatCard";
import { useAuth } from "../context/AuthContext";
import { CreateProjectForm } from "./CreateProjectForm";

export const Dashboard = () => {


  const [activeMenu, setActiveMenu] = useState('dashboard');
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="" />
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      {/* Aquí se renderizan las diferentes vistas */}
      <main className="ml-64 pt-16">
        <Outlet />
      </main>
    </div>
  );
};
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./NavBar";
import { Sidebar } from "./SideBar";
import { SearchProvider } from "../../context/SearchContext";


export const Dashboard = () => {


  const [activeMenu, setActiveMenu] = useState('dashboard');
  

  return (
     <SearchProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar ahora está DENTRO del SearchProvider */}
        <Navbar/>
        
        <div className="flex pt-18">
           <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          
          <main className="flex-1 ml-64">
            <Outlet />
          </main>
        </div>
      </div>
    </SearchProvider>
      
  );
};
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from './SideBar'; // Adjust path as needed

function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/"); 
  };

  return (
    <div className="drawer drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content">
        <Outlet />
      </div>

      <SideBar handleLogout={handleLogout} />
    </div>
  );
}

export default AppLayout;
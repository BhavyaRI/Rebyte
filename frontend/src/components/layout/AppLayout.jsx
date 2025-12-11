import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from './SideBar'; 

function AppLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/"); 
  };
  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className="drawer drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content">
        <Outlet />
      </div>

      <SideBar handleLogout={handleLogout} handleHome={handleHome}/>
    </div>
  );
}

export default AppLayout;
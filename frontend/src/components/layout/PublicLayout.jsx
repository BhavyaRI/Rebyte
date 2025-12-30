import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className='App'>
      <div className="navbar bg-base shadow-md px-6">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-neutral">
            MyApp
          </Link>
        </div>
        <div className="flex-none space-x-4">
          <Link to="/signup" className="btn btn-outline btn-neutral">
            Signup
          </Link>
          <Link to="/login" className="btn btn-neutral">
            Login
          </Link>
        </div>
      </div>
      
    
      <Outlet />
    </div>
  );
};
export default PublicLayout;
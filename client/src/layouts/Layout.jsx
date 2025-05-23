import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">POS System</h1>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          Sales
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          Inventory
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          Employees
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          Customers
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          Settings
        </NavLink>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

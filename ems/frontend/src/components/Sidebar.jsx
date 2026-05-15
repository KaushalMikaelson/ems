import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <LayoutDashboard size={28} />
        <span>Nexus EMS</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
          <Users size={20} />
          <span>Employees</span>
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <UserPlus size={20} />
          <span>Add Employee</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

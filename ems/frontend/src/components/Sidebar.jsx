import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Settings, Layers, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
          borderRadius: '12px', padding: '0.5rem', display: 'flex', color: 'white',
          boxShadow: '0 4px 15px var(--primary-glow)'
        }}>
          <Layers size={24} />
        </div>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', letterSpacing: '1px' }}>EMS</span>
      </div>
      
      <div className="nav-links" style={{ flex: 1 }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', paddingLeft: '1.25rem', fontWeight: 600 }}>
          Menu
        </div>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
          <Users size={20} />
          <span>Team Roster</span>
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <UserPlus size={20} />
          <span>Onboard Employee</span>
        </NavLink>
        <div style={{ height: '1px', background: 'var(--border-color)', margin: '1rem 0' }}></div>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', paddingLeft: '1.25rem', fontWeight: 600 }}>
          System
        </div>
        <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </div>

      <div style={{ 
        marginTop: 'auto', 
        padding: '1.25rem', 
        background: 'rgba(255,255,255,0.03)', 
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', backgroundImage: 'url(https://i.pravatar.cc/150?u=admin)', backgroundSize: 'cover' }}></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>Admin User</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>admin@nexus.com</div>
        </div>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--danger)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

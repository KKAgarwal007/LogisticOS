import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, Package, Users, MapPin, CalendarClock, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Vehicles', path: '/vehicles', icon: Truck },
    { name: 'Shipments', path: '/shipments', icon: Package },
    { name: 'Drivers', path: '/drivers', icon: Users },
    { name: 'Tracking', path: '/tracking', icon: MapPin },
    { name: 'Scheduling', path: '/scheduling', icon: CalendarClock },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-slate-800 flex flex-col h-screen text-slate-300 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-sm font-bold text-primary tracking-wider">Aether Logistix</h1>
            <p className="text-xs text-slate-400 font-medium font-mono mt-1">Global Transit Command</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

      <nav className="flex-1 mt-6 space-y-1 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-transparent text-white border-l-2 border-primary shadow-[inset_2px_0_10px_rgba(6,182,212,0.3)]'
                  : 'hover:bg-slate-800/50 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.fullName || 'Admin Commander'}</p>
              <p className="text-xs text-slate-400 font-mono truncate">Level 4 Auth</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0 ml-2"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;

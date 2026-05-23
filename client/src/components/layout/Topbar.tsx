import React, { useState } from 'react';
import { Search, Bell, Settings, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface TopbarProps {
  action?: React.ReactNode;
  searchPlaceholder?: string;
  onMenuClick: () => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

const Topbar: React.FC<TopbarProps> = ({ action, searchPlaceholder = "Global Fleet Search...", onMenuClick, searchValue, onSearchChange }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="h-20 bg-background border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 text-slate-300">
      <div className="flex items-center flex-1 max-w-2xl">
        <button 
          onClick={onMenuClick}
          className="lg:hidden mr-4 text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative flex-1 hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchValue}
            onChange={e => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 lg:space-x-6 ml-auto lg:ml-4">
        {action && <div className="mr-2 lg:mr-4 hidden sm:block">{action}</div>}
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
        </button>
        <button className="hidden sm:block text-slate-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-formBg overflow-hidden border border-slate-700 hover:border-slate-500 transition-colors focus:outline-none"
          >
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || 'Admin'}`} 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-sm font-medium text-white">{user?.fullName || 'Admin'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.workEmail || 'admin@aether.com'}</p>
              </div>
              <button 
                onClick={() => { setDropdownOpen(false); logout(); }}
                className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-slate-800 transition-colors text-left"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;

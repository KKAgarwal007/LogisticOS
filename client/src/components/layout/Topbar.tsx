import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface TopbarProps {
  action?: React.ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ action }) => {
  const { user } = useAuth();

  return (
    <div className="h-20 bg-background border-b border-slate-800 flex items-center justify-between px-8 text-slate-300">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Global Fleet Search..."
            className="w-full bg-slate-900/60 border border-slate-800 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 ml-4">
        {action && <div className="mr-4">{action}</div>}
        <button className="text-slate-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-full bg-formBg overflow-hidden border border-slate-700">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || 'Admin'}`} 
            alt="User Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface MainLayoutProps {
  children: React.ReactNode;
  topbarAction?: React.ReactNode;
  transparentBackground?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, topbarAction, transparentBackground, searchPlaceholder, searchValue, onSearchChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`flex h-screen overflow-hidden selection:bg-primary/30 ${transparentBackground ? 'bg-transparent' : 'bg-background'}`}>
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col relative w-full min-w-0">
        <Topbar action={topbarAction} searchPlaceholder={searchPlaceholder} searchValue={searchValue} onSearchChange={onSearchChange} onMenuClick={() => setMobileMenuOpen(true)} />
        
        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto ${transparentBackground ? 'bg-transparent p-0 pb-0' : 'p-8 bg-slate-900/40 pb-16'}`}>
          {children}
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full bg-background border-t border-slate-800 py-3 px-8 flex justify-between items-center text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          <div className="flex items-center space-x-2">
            <span>System Operational - API 1.2ms | DB Synced</span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">API Status</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Protocol</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Security Vault</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;

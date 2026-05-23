import React from 'react';
import { Network } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="z-10 w-full max-w-md flex flex-col items-center mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Network className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-white tracking-wide">Aether Logistix</h1>
        </div>
        <p className="text-slate-400 text-center text-sm">
          Access Command Center<br />
          Enter your credentials to manage global operations.
        </p>
      </div>

      <div className="z-10 w-full">
        <Outlet />
      </div>

      <div className="fixed bottom-8 w-full flex justify-between px-12 text-[10px] text-slate-600 font-mono font-semibold tracking-widest uppercase">
        <span>AES-256 ENCRYPTED ENDPOINT</span>
        <span>V2.4.0-STABLE</span>
      </div>
    </div>
  );
};

export default AuthLayout;

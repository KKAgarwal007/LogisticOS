import React, { useState } from 'react';
import { User, Building2, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('https://logisticos-q046.onrender.com/api/auth/register', {
        fullName,
        companyName,
        workEmail: email,
        password,
      });
      login(data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-xl bg-formBg border border-slate-800 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">{error}</div>}
        
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 tracking-wider">FULL NAME</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 tracking-wider">COMPANY NAME</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Logistics Corp"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 tracking-wider">WORK EMAIL</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="email" 
              placeholder="operator@aether.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 tracking-wider">PASSWORD</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input type="checkbox" required className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-primary focus:ring-primary focus:ring-offset-0" />
            <span className="text-xs text-slate-400 font-medium group-hover:text-slate-300 transition-colors">I agree to the <span className="text-white hover:text-primary transition-colors">Terms of Service</span></span>
          </label>
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-cyan-500 hover:from-primaryHover hover:to-cyan-600 text-white py-2.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            <span>REGISTER OPERATOR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-4 text-center border-t border-slate-800">
          <p className="text-sm text-slate-400">
            Already an operator? <button type="button" onClick={onToggleForm} className="text-white hover:text-primary transition-colors font-medium">Sign In</button>
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-full px-3 py-1">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[10px] text-green-400 font-semibold tracking-widest uppercase">Security Verified</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

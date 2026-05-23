import React from 'react';
import { Truck, Star } from 'lucide-react';

export interface Driver {
  id: string;
  name: string;
  seed: string;
  status: 'On-Duty' | 'Off-Duty' | 'On-Leave';
  role: 'Expert' | 'Senior' | 'Junior';
  stars: number;
  vehicle: string;
  rating: number;
  experience: string;
}

interface Props {
  driver: Driver;
}

const DriverCard: React.FC<Props> = ({ driver }) => {
  return (
    <div className="bg-formBg rounded-xl p-6 border border-slate-800 shadow-xl flex flex-col hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 overflow-hidden border-2 border-slate-700">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`} 
              alt={driver.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-formBg ${driver.status === 'On-Duty' ? 'bg-emerald-400' : driver.status === 'On-Leave' ? 'bg-amber-400' : 'bg-pink-400'}`}></span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="bg-slate-800/80 text-slate-300 text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase mb-2 border border-slate-700">
            {driver.role}
          </span>
          <div className="flex space-x-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                className={`w-3 h-3 ${star <= driver.stars ? 'text-slate-300 fill-slate-300' : 'text-slate-700 fill-slate-700'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 leading-tight">{driver.name}</h3>
      
      <div className="flex items-start space-x-2 text-slate-400 mb-8">
        <Truck className="w-4 h-4 mt-0.5 shrink-0" />
        <span className="text-xs leading-snug font-mono">{driver.vehicle}</span>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-[10px] font-mono text-slate-500 font-bold tracking-widest uppercase mb-1">Rating</h4>
          <p className="text-emerald-400 font-bold text-sm">{driver.rating.toFixed(1)}%</p>
        </div>
        <div>
          <h4 className="text-[10px] font-mono text-slate-500 font-bold tracking-widest uppercase mb-1">Exp</h4>
          <p className="text-white font-bold text-sm">{driver.experience}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;

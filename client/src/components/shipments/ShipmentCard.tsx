import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type Priority = 'High' | 'Low' | 'Completed';

export interface Shipment {
  id: string;
  trackingId: string;
  title: string;
  origin: string;
  destination: string;
  priority: Priority;
  progress: number;
  progressText?: string;
  dueText?: string;
  columnId: string;
}

interface Props {
  shipment: Shipment;
}

const ShipmentCard: React.FC<Props> = ({ shipment }) => {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: shipment.id, data: { type: 'Shipment', shipment } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityStyles = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'bg-red-900/40 text-red-400 border border-red-500/30';
      case 'Low': return 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30';
      case 'Completed': return 'bg-slate-800 text-slate-400 border border-slate-700';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  const getIcon = () => {
    if (shipment.columnId === 'delivered') return <CheckCircle2 className="w-3 h-3 text-slate-500 mt-1 shrink-0" />;
    if (shipment.columnId === 'in_transit') return <Truck className="w-3 h-3 text-slate-500 mt-1 shrink-0" />;
    return <MapPin className="w-3 h-3 text-slate-500 mt-1 shrink-0" />;
  };

  const getProgressColor = () => {
    if (shipment.columnId === 'delivered') return 'bg-emerald-500';
    if (shipment.columnId === 'in_transit') return 'bg-cyan-400';
    if (shipment.columnId === 'scheduled') return 'bg-purple-400';
    return 'bg-slate-500';
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/tracking?id=${shipment.trackingId}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-slate-900/60 rounded-xl p-5 border border-slate-700/50 cursor-grab active:cursor-grabbing hover:border-slate-600 transition-colors group ${isDragging ? 'opacity-50 ring-2 ring-primary shadow-2xl' : 'shadow-lg'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span 
          onClick={handleTrackClick}
          className="text-white font-mono font-bold text-sm cursor-pointer hover:text-cyan-400 transition-colors underline decoration-slate-600 decoration-dashed underline-offset-4"
          title="Track Shipment"
        >
          #{shipment.trackingId || shipment.id}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase ${getPriorityStyles(shipment.priority)}`}>
          {shipment.priority}
        </span>
      </div>

      <h3 className="text-slate-200 font-bold text-sm mb-4 leading-tight group-hover:text-primary transition-colors">
        {shipment.title}
      </h3>

      <div className="flex items-start space-x-2 mb-6 text-slate-400">
        {getIcon()}
        <span className="text-xs leading-snug">{shipment.origin} &rarr; {shipment.destination}</span>
      </div>

      <div className="mt-auto">
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
          <div className={`${getProgressColor()} h-full rounded-full`} style={{ width: `${shipment.progress}%` }}></div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
          <span>{shipment.progressText}</span>
          <span>{shipment.dueText}</span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;

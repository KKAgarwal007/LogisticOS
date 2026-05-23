import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ShipmentCard from './ShipmentCard';
import type { Shipment } from './ShipmentCard';

interface Props {
  id: string;
  title: string;
  colorClass: string;
  shipments: Shipment[];
}

const ShipmentColumn: React.FC<Props> = ({ id, title, colorClass, shipments }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col h-full min-w-[280px] w-full max-w-[320px] shrink-0">
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${colorClass} shadow-[0_0_8px_currentColor]`}></span>
          <h2 className="text-white font-bold tracking-wide">{title}</h2>
        </div>
        <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded font-mono font-bold">
          {shipments.length}
        </span>
      </div>

      <div 
        ref={setNodeRef}
        className="flex-1 bg-formBg/50 border border-slate-800/50 rounded-2xl p-3 flex flex-col space-y-4 overflow-y-auto"
      >
        <SortableContext items={shipments.map(s => s.id)} strategy={verticalListSortingStrategy}>
          {shipments.map(shipment => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default ShipmentColumn;

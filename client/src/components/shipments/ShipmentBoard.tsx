import React, { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ShipmentColumn from './ShipmentColumn';
import ShipmentCard, { type Shipment } from './ShipmentCard';

const initialShipments: Shipment[] = [
  {
    id: 'LOG-7721',
    title: 'Micro-Processors Hub B',
    origin: 'Shenzhen',
    destination: 'Munich',
    priority: 'High',
    progress: 15,
    progressText: '15% Processed',
    dueText: 'Due: 24h',
    columnId: 'pending'
  },
  {
    id: 'LOG-8842',
    title: 'Textile Batch 401',
    origin: 'Hanoi',
    destination: 'Los Angeles',
    priority: 'Low',
    progress: 5,
    progressText: '5% Processed',
    dueText: 'Due: 5d',
    columnId: 'pending'
  },
  {
    id: 'LOG-9001',
    title: 'Medical Equipment Kit',
    origin: 'Berlin',
    destination: 'Tokyo',
    priority: 'High',
    progress: 40,
    progressText: '40% Scheduled',
    dueText: 'Due: 12h',
    columnId: 'scheduled'
  },
  {
    id: 'LOG-6612',
    title: 'Electric Vehicle Components',
    origin: 'Mid-Atlantic Ocean',
    destination: 'Port',
    priority: 'Low',
    progress: 75,
    progressText: '75% Journey',
    dueText: 'ETA: 2d',
    columnId: 'in_transit'
  },
  {
    id: 'LOG-4410',
    title: 'Automated Server Rack',
    origin: 'Dublin Data Center',
    destination: 'Delivered',
    priority: 'Completed',
    progress: 100,
    progressText: 'delivered',
    dueText: '',
    columnId: 'delivered'
  }
];

const columns = [
  { id: 'pending', title: 'Pending', colorClass: 'bg-slate-400' },
  { id: 'scheduled', title: 'Scheduled', colorClass: 'bg-purple-400' },
  { id: 'in_transit', title: 'In Transit', colorClass: 'bg-cyan-400' },
  { id: 'delivered', title: 'Delivered', colorClass: 'bg-emerald-400' }
];

const ShipmentBoard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Shipment';
    const isOverTask = over.data.current?.type === 'Shipment';

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      setShipments(prev => {
        const activeIndex = prev.findIndex(t => t.id === activeId);
        const overIndex = prev.findIndex(t => t.id === overId);

        if (prev[activeIndex].columnId !== prev[overIndex].columnId) {
          const newShipments = [...prev];
          newShipments[activeIndex].columnId = newShipments[overIndex].columnId;
          return arrayMove(newShipments, activeIndex, overIndex);
        }
        return arrayMove(prev, activeIndex, overIndex);
      });
    }

    // Dropping a task over an empty column
    const isOverColumn = columns.some(c => c.id === overId);
    if (isActiveTask && isOverColumn) {
      setShipments(prev => {
        const activeIndex = prev.findIndex(t => t.id === activeId);
        const newShipments = [...prev];
        newShipments[activeIndex].columnId = overId as string;
        return arrayMove(newShipments, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setShipments(prev => {
      const activeIndex = prev.findIndex(t => t.id === activeId);
      const overIndex = prev.findIndex(t => t.id === overId);
      if (overIndex !== -1) {
        return arrayMove(prev, activeIndex, overIndex);
      }
      return prev;
    });
  };

  const activeShipment = shipments.find(s => s.id === activeId);

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex space-x-6 overflow-x-auto h-full pb-8">
        {columns.map(col => (
          <ShipmentColumn 
            key={col.id} 
            id={col.id} 
            title={col.title} 
            colorClass={col.colorClass} 
            shipments={shipments.filter(s => s.columnId === col.id)} 
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeShipment ? <ShipmentCard shipment={activeShipment} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ShipmentBoard;

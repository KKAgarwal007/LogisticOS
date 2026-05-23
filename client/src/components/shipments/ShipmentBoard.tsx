import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const columns = [
  { id: 'pending', title: 'Pending', colorClass: 'bg-slate-400' },
  { id: 'scheduled', title: 'Scheduled', colorClass: 'bg-purple-400' },
  { id: 'in_transit', title: 'In Transit', colorClass: 'bg-cyan-400' },
  { id: 'delivered', title: 'Delivered', colorClass: 'bg-emerald-400' }
];

interface ShipmentBoardProps {
  refreshKey?: number;
}

const ShipmentBoard: React.FC<ShipmentBoardProps> = ({ refreshKey = 0 }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/data/shipments');
        const fetchedShipments = res.data.map((s: any) => ({
          ...s,
          id: s._id
        }));
        setShipments(fetchedShipments);
      } catch (err) {
        console.error('Failed to fetch shipments', err);
      }
    };
    fetchShipments();
  }, [refreshKey]);

  useEffect(() => {
    socket.on('shipment_updated', (updated: any) => {
      setShipments(prev => prev.map(s => s.id === updated._id ? { ...updated, id: updated._id } : s));
    });

    socket.on('shipment_created', (created: any) => {
      setShipments(prev => [{ ...created, id: created._id }, ...prev]);
    });

    return () => {
      socket.off('shipment_updated');
      socket.off('shipment_created');
    };
  }, []);

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
          newShipments[activeIndex] = { ...newShipments[activeIndex], columnId: newShipments[overIndex].columnId };
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
        newShipments[activeIndex] = { ...newShipments[activeIndex], columnId: overId as string };
        return arrayMove(newShipments, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Robustly determine target column from dnd-kit's data payload directly
    let targetColumnId = '';
    const isOverColumn = columns.some(c => c.id === overId);
    
    if (isOverColumn) {
      targetColumnId = overId;
    } else {
      const overShipment = over.data.current?.shipment;
      if (overShipment) {
        targetColumnId = overShipment.columnId;
      }
    }

    if (!targetColumnId) return;

    // Update UI optimistically
    setShipments(prev => {
      const newActiveIndex = prev.findIndex(t => t.id === activeId);
      const newOverIndex = prev.findIndex(t => t.id === overId);
      
      if (newActiveIndex === -1) return prev;

      const newShipments = [...prev];
      newShipments[newActiveIndex] = { ...newShipments[newActiveIndex], columnId: targetColumnId };

      if (newOverIndex !== -1) {
        return arrayMove(newShipments, newActiveIndex, newOverIndex);
      }
      return newShipments;
    });

    // Make API call
    try {
      await axios.patch(`http://localhost:8080/api/data/shipments/${activeId}`, {
        columnId: targetColumnId
      });
    } catch (err) {
      console.error('Failed to update shipment column', err);
    }
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
      <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto h-full pb-8 snap-x snap-mandatory">
        {columns.map(col => (
          <div key={col.id} className="min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-center h-full">
            <ShipmentColumn 
              id={col.id} 
              title={col.title} 
              colorClass={col.colorClass} 
              shipments={shipments.filter(s => s.columnId === col.id)} 
            />
          </div>
        ))}
      </div>
      
      <DragOverlay>
        {activeShipment ? <ShipmentCard shipment={activeShipment} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ShipmentBoard;

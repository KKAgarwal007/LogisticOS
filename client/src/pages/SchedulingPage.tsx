import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import CalendarBoard from '../components/scheduling/CalendarBoard';
import PriorityAlerts from '../components/scheduling/PriorityAlerts';
import UpcomingTasks from '../components/scheduling/UpcomingTasks';
import Modal from '../components/ui/Modal';
import AddScheduleForm from '../components/forms/AddScheduleForm';

const SchedulingPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <MainLayout searchPlaceholder="Search operations...">
      <div className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Main Calendar Area */}
        <div className="lg:col-span-8 h-200 lg:h-full">
          <CalendarBoard 
            onAddSchedule={() => setIsAddModalOpen(true)} 
            refreshKey={refreshKey}
          />
        </div>

        {/* Right Side Alerts & Tasks */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
          <div className="shrink-0 h-auto">
            <PriorityAlerts />
          </div>
          <div className="flex-1 min-h-100">
            <UpcomingTasks />
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Schedule New Event"
      >
        <AddScheduleForm 
          onSuccess={() => {
            setIsAddModalOpen(false);
            setRefreshKey(prev => prev + 1);
          }} 
          onCancel={() => setIsAddModalOpen(false)} 
        />
      </Modal>
    </MainLayout>
  );
};

export default SchedulingPage;

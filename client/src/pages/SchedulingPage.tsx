import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import CalendarBoard from '../components/scheduling/CalendarBoard';
import PriorityAlerts from '../components/scheduling/PriorityAlerts';
import UpcomingTasks from '../components/scheduling/UpcomingTasks';

const SchedulingPage: React.FC = () => {
  return (
    <MainLayout searchPlaceholder="Search operations...">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Main Calendar Area */}
        <div className="lg:col-span-8 h-[800px] lg:h-full">
          <CalendarBoard />
        </div>

        {/* Right Side Alerts & Tasks */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
          <div className="shrink-0 h-auto">
            <PriorityAlerts />
          </div>
          <div className="flex-1 min-h-[400px]">
            <UpcomingTasks />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SchedulingPage;

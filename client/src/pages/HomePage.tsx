import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import KPICards from '../components/dashboard/KPICards';
import VolumeChart from '../components/dashboard/VolumeChart';
import UtilizationChart from '../components/dashboard/UtilizationChart';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import QuickActions from '../components/dashboard/QuickActions';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <KPICards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-80">
          <div className="lg:col-span-2 h-80 lg:h-auto">
            <VolumeChart />
          </div>
          <div className="h-80 lg:h-auto">
            <UtilizationChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[340px]">
          <div className="lg:col-span-2 h-[340px] lg:h-auto">
            <ActivityFeed />
          </div>
          <div className="h-[340px] lg:h-auto">
            <QuickActions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;

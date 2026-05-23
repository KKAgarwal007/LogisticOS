import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../components/layout/MainLayout';
import TrackingSidebar from '../components/tracking/TrackingSidebar';
import TelemetryMiniCards from '../components/tracking/TelemetryMiniCards';
import WeatherCard from '../components/tracking/WeatherCard';
import TrafficCard from '../components/tracking/TrafficCard';
import TelemetryFeed from '../components/tracking/TelemetryFeed';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const TrackingPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialId = queryParams.get('id') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialId);
  const [shipment, setShipment] = useState<any>(null);

  useEffect(() => {
    if (!searchQuery) {
      setShipment(null);
      return;
    }
    const fetchShipment = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/data/shipments');
        const found = res.data.find((s: any) => s.trackingId.toLowerCase() === searchQuery.toLowerCase());
        setShipment(found || null);
      } catch (err) {
        console.error(err);
      }
    };
    const timeoutId = setTimeout(fetchShipment, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const handleUpdate = (updated: any) => {
      setShipment((prev: any) => {
        if (prev && prev._id === updated._id) {
          return updated;
        }
        return prev;
      });
    };

    socket.on('shipment_updated', handleUpdate);
    return () => {
      socket.off('shipment_updated', handleUpdate);
    };
  }, []);
  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Map Background Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/tracking_map_bg.png)' }}
      >
        <div className="absolute inset-0 bg-slate-900/60"></div>
      </div>

      {/* UI Content Layer */}
      <div className="relative z-10 h-screen overflow-hidden flex flex-col">
        <MainLayout 
          transparentBackground 
          searchPlaceholder="Trace Shipment ID... (e.g. LOG-1234)"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        >
          <div className="flex flex-col lg:flex-row h-full max-w-[1600px] mx-auto gap-8 pt-4 pb-4 px-4 lg:px-8 overflow-y-auto lg:overflow-hidden">
            
            {/* Left Sidebar */}
            <div className="w-full lg:w-[380px] shrink-0 lg:h-full">
              <TrackingSidebar shipment={shipment} searchQuery={searchQuery} />
            </div>

            {/* Right Dashboards Area */}
            <div className="flex-1 flex flex-col gap-6 h-full">
              {/* Top Row Mini Cards */}
              <div className="shrink-0">
                <TelemetryMiniCards />
              </div>

              {/* Middle Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[400px] lg:min-h-0">
                <WeatherCard />
                <TrafficCard />
              </div>

              {/* Bottom Row Feed */}
              <div className="shrink-0">
                <TelemetryFeed />
              </div>
            </div>

          </div>
        </MainLayout>
      </div>
    </div>
  );
};

export default TrackingPage;

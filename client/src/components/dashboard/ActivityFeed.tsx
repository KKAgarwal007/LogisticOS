import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle2, AlertOctagon, Package } from 'lucide-react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  _id: string;
  type: string;
  title: string;
  description: string;
  iconType: string;
  createdAt: string;
}

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/data/activities');
        setActivities(res.data);
      } catch (err) {
        console.error('Failed to fetch activities', err);
      }
    };
    fetchActivities();
    const interval = setInterval(fetchActivities, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const getIconData = (type: string, iconType: string) => {
    let Icon = Truck;
    if (iconType === 'Package') Icon = Package;
    if (type === 'success') Icon = CheckCircle2;
    if (type === 'alert') Icon = AlertOctagon;

    let iconColor = 'text-slate-300';
    let iconBg = 'bg-slate-700';

    if (type === 'success') {
      iconColor = 'text-emerald-400';
      iconBg = 'bg-emerald-500/20';
    } else if (type === 'alert') {
      iconColor = 'text-red-400';
      iconBg = 'bg-red-500/20';
    } else if (type === 'update') {
      iconColor = 'text-cyan-400';
      iconBg = 'bg-cyan-500/20';
    }

    return { Icon, iconColor, iconBg };
  };

  return (
    <div className="bg-formBg rounded-xl p-6 border border-slate-800 shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-slate-200 font-medium">Live Activity Feed</h2>
        <span className="text-emerald-400 text-xs font-bold font-mono tracking-widest flex items-center">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse mr-2"></span>
          Live System
        </span>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <p className="text-slate-500 text-sm text-center mt-10">No recent activities.</p>
        ) : (
          activities.map((activity) => {
            const { Icon, iconColor, iconBg } = getIconData(activity.type, activity.iconType);
            const timeAgo = formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true });
            
            return (
              <div key={activity._id} className="flex space-x-4">
                <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-white font-medium leading-snug">{activity.title}</p>
                  <div className="flex items-center space-x-2 mt-1.5">
                    <span className="text-xs text-slate-500 font-mono">{timeAgo}</span>
                    <span className="text-xs text-slate-600 font-mono">•</span>
                    <span className="text-xs text-slate-400">{activity.description}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;

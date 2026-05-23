import React, { useState } from 'react';
import axios from 'axios';

interface AddVehicleFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    vehicleId: '',
    class: 'Heavy Freight',
    capacity: 20000,
    efficiency: '92%',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://logisticos-q046.onrender.com/api/data/vehicles', formData);
      
      // Also create an activity log for this
      await axios.post('https://logisticos-q046.onrender.com/api/data/activities', {
        type: 'success',
        title: 'New Vehicle Registered',
        description: `Vehicle ${formData.vehicleId} added to the fleet.`,
        iconType: 'Truck'
      });
      
      onSuccess();
    } catch (error) {
      console.error('Failed to add vehicle:', error);
      alert('Failed to add vehicle. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Vehicle ID</label>
        <input 
          required 
          type="text" 
          value={formData.vehicleId}
          onChange={e => setFormData({...formData, vehicleId: e.target.value})}
          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          placeholder="e.g. TRK-9901"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Class</label>
        <select 
          value={formData.class}
          onChange={e => setFormData({...formData, class: e.target.value})}
          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
        >
          <option>Heavy Freight</option>
          <option>Light Transport</option>
          <option>Electric Van</option>
          <option>Drone Unit</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Capacity (kg)</label>
          <input 
            required 
            type="number" 
            value={formData.capacity}
            onChange={e => setFormData({...formData, capacity: Number(e.target.value)})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Efficiency</label>
          <input 
            required 
            type="text" 
            value={formData.efficiency}
            onChange={e => setFormData({...formData, efficiency: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Status</label>
        <select 
          value={formData.status}
          onChange={e => setFormData({...formData, status: e.target.value})}
          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
        >
          <option>Active</option>
          <option>Maintenance</option>
          <option>In Transit</option>
        </select>
      </div>

      <div className="flex space-x-3 pt-4 border-t border-slate-800">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 py-3 rounded-lg font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 py-3 rounded-lg font-bold text-slate-900 bg-primary hover:bg-cyan-300 transition-colors disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Add Vehicle'}
        </button>
      </div>
    </form>
  );
};

export default AddVehicleForm;

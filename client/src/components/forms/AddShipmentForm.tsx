import React, { useState } from 'react';
import axios from 'axios';

interface AddShipmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddShipmentForm: React.FC<AddShipmentFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    trackingId: '',
    title: '',
    origin: '',
    destination: '',
    priority: 'Medium',
    progress: 0,
    columnId: 'pending'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://logisticos-q046.onrender.com/api/data/shipments', formData);
      
      // Also create an activity log for this
      await axios.post('https://logisticos-q046.onrender.com/api/data/activities', {
        type: 'update',
        title: 'New Shipment Created',
        description: `Shipment ${formData.trackingId}: ${formData.title} to ${formData.destination}.`,
        iconType: 'Package'
      });
      
      onSuccess();
    } catch (error) {
      console.error('Failed to create shipment:', error);
      alert('Failed to create shipment. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Tracking ID</label>
          <input 
            required 
            type="text" 
            value={formData.trackingId}
            onChange={e => setFormData({...formData, trackingId: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
            placeholder="e.g. LOG-1234"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Title/Cargo</label>
          <input 
            required 
            type="text" 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
            placeholder="e.g. Electronics Batch"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Origin</label>
          <input 
            required 
            type="text" 
            value={formData.origin}
            onChange={e => setFormData({...formData, origin: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Destination</label>
          <input 
            required 
            type="text" 
            value={formData.destination}
            onChange={e => setFormData({...formData, destination: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Priority</label>
        <select 
          value={formData.priority}
          onChange={e => setFormData({...formData, priority: e.target.value})}
          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
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
          {loading ? 'Creating...' : 'Create Shipment'}
        </button>
      </div>
    </form>
  );
};

export default AddShipmentForm;

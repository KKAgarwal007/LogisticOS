import React, { useState } from 'react';
import axios from 'axios';

interface AddScheduleFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddScheduleForm: React.FC<AddScheduleFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'express',
    date: new Date().toISOString().slice(0, 10)
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('https://logisticos-q046.onrender.com/api/data/schedules', formData);
      
      // Log activity
      await axios.post('https://logisticos-q046.onrender.com/api/data/activities', {
        type: 'update',
        title: 'Schedule Added',
        description: `New ${formData.type} schedule: ${formData.title}.`,
        iconType: 'Activity'
      });
      
      onSuccess();
    } catch (error) {
      console.error('Failed to add schedule:', error);
      alert('Failed to add schedule. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Event Title</label>
        <input 
          required 
          type="text" 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          placeholder="e.g. TX-402 Berlin Dispatch"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Type</label>
          <select 
            value={formData.type}
            onChange={e => setFormData({...formData, type: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
          >
            <option value="express">Express Transit</option>
            <option value="bulk">Bulk Carrier</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Date</label>
          <input 
            required 
            type="date" 
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          />
        </div>
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
          {loading ? 'Saving...' : 'Add Schedule'}
        </button>
      </div>
    </form>
  );
};

export default AddScheduleForm;

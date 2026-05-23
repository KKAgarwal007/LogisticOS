import React, { useState } from 'react';
import axios from 'axios';

interface AddDriverFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddDriverForm: React.FC<AddDriverFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    seed: '',
    role: 'Expert',
    stars: 5,
    rating: 100,
    experience: '5 Yrs',
    vehicle: 'TRK-001',
    status: 'On-Duty'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Auto generate seed from name if empty
    const payload = {
      ...formData,
      seed: formData.seed || formData.name.replace(/\s+/g, '')
    };

    try {
      await axios.post('http://localhost:8080/api/data/drivers', payload);
      
      // Also create an activity log for this
      await axios.post('http://localhost:8080/api/data/activities', {
        type: 'success',
        title: 'New Driver Registered',
        description: `Driver ${payload.name} added to the active roster.`,
        iconType: 'UserCircle'
      });
      
      onSuccess();
    } catch (error) {
      console.error('Failed to add driver:', error);
      alert('Failed to add driver. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Driver Name</label>
        <input 
          required 
          type="text" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          placeholder="e.g. John Doe"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Role</label>
          <select 
            value={formData.role}
            onChange={e => setFormData({...formData, role: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
          >
            <option value="Expert">Expert</option>
            <option value="Senior">Senior</option>
            <option value="Junior">Junior</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Status</label>
          <select 
            value={formData.status}
            onChange={e => setFormData({...formData, status: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
          >
            <option value="On-Duty">On-Duty</option>
            <option value="Off-Duty">Off-Duty</option>
            <option value="On-Leave">On-Leave</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Experience</label>
          <input 
            required 
            type="text" 
            value={formData.experience}
            onChange={e => setFormData({...formData, experience: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
            placeholder="e.g. 5 Yrs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Initial Rating (%)</label>
          <input 
            required 
            type="number" 
            min="0"
            max="100"
            value={formData.rating}
            onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Assigned Vehicle</label>
          <input 
            required 
            type="text" 
            value={formData.vehicle}
            onChange={e => setFormData({...formData, vehicle: e.target.value})}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" 
            placeholder="e.g. TRK-001"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Stars</label>
          <input 
            required 
            type="number" 
            min="1"
            max="5"
            value={formData.stars}
            onChange={e => setFormData({...formData, stars: Number(e.target.value)})}
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
          {loading ? 'Registering...' : 'Add Driver'}
        </button>
      </div>
    </form>
  );
};

export default AddDriverForm;

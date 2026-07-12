'use client';

import { useState } from 'react';
import { hotelService } from '../../services/hotelService';

export default function HotelExtranet() {
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Form State
  const [roomId, setRoomId] = useState('room-123');
  const [allocation, setAllocation] = useState(15);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoadInventory = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      // In a real app we'd expand the date range to an array of all dates. For MVP, we send the start/end as an array.
      const dates = [startDate, endDate].filter(Boolean);
      if (dates.length === 0) {
        throw new Error('Please provide at least one date');
      }
      await hotelService.loadInventory(roomId, dates, allocation);
      setSuccess('Inventory successfully loaded!');
    } catch (err: any) {
      setError(err.message || 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="heading-1" style={{ marginBottom: '8px' }}>Hotel Extranet</h1>
          <p className="text-muted">Manage properties, room types, and allocations.</p>
        </div>
        <button className="erp-btn erp-btn-primary">
          + Add New Property
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px' }}>
        <button 
          onClick={() => setActiveTab('inventory')}
          style={{ 
            background: 'none', border: 'none', padding: '12px 0', cursor: 'pointer',
            color: activeTab === 'inventory' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'inventory' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            fontWeight: activeTab === 'inventory' ? 600 : 500,
            fontSize: '1rem', transition: 'all var(--transition-fast)'
          }}
        >
          Bulk Inventory Loader
        </button>
        <button 
          onClick={() => setActiveTab('properties')}
          style={{ 
            background: 'none', border: 'none', padding: '12px 0', cursor: 'pointer',
            color: activeTab === 'properties' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'properties' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            fontWeight: activeTab === 'properties' ? 600 : 500,
            fontSize: '1rem', transition: 'all var(--transition-fast)'
          }}
        >
          My Properties
        </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="erp-card">
          <h2 className="heading-2">Load Inventory</h2>
          <p className="text-muted" style={{ marginBottom: '24px' }}>Atomic bulk allocation upload. Prevents negative inventory.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label className="erp-label">Select Room Type</label>
              <select className="erp-input" value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                <option value="room-123">Grand Plaza - Standard Double</option>
                <option value="room-456">Grand Plaza - Premium Suite</option>
              </select>
            </div>
            <div>
              <label className="erp-label">Total Allocation</label>
              <input type="number" className="erp-input" placeholder="e.g. 15" value={allocation} onChange={(e) => setAllocation(Number(e.target.value))} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="erp-label">Date Range (dd-mm-yyyy)</label>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" className="erp-input" placeholder="Start Date: 15-08-2026" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <input type="text" className="erp-input" placeholder="End Date: 30-08-2026" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Note: Real app would generate an array of dates between start and end. MVP passes [startDate] directly to API.</p>
          </div>

          {error && <div style={{ color: 'var(--accent-danger)', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600 }}>{error}</div>}
          {success && <div style={{ color: 'var(--accent-secondary)', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600 }}>{success}</div>}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="erp-btn erp-btn-primary" onClick={handleLoadInventory} disabled={loading}>
              {loading ? 'Loading...' : 'Apply Allocation'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'properties' && (
        <div className="erp-card">
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <h3 className="heading-2">No properties yet</h3>
            <p>Click the Add New Property button to get started.</p>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';
import { tourService } from '../../services/tourService';

export default function TourOperator() {
  const [showModal, setShowModal] = useState(false);
  const [tourId, setTourId] = useState('tour-123'); // Default for demo
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [capacity, setCapacity] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateDeparture = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      if (!date || !startTime) throw new Error('Date and Time required');
      await tourService.createDeparture(tourId, date, startTime, capacity);
      setSuccess('Departure successfully created!');
      setTimeout(() => setShowModal(false), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create departure');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="heading-1" style={{ marginBottom: '8px' }}>Tour Operator Extranet</h1>
          <p className="text-muted">Manage tour catalog, departures, and capacity limits.</p>
        </div>
        <button className="erp-btn erp-btn-primary">
          + Add New Tour
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
        
        {/* Left Column - Tour List */}
        <div className="erp-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
            <h3 className="heading-2" style={{ fontSize: '1rem', margin: 0 }}>Active Tours</h3>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid var(--accent-primary)', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>Desert Safari & BBQ</div>
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>DXB-DSF-01 • 360 Mins</div>
            </li>
            <li style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>City Sightseeing Tour</div>
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>DXB-CTY-02 • 240 Mins</div>
            </li>
          </ul>
        </div>

        {/* Right Column - Departures */}
        <div className="erp-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="heading-2">Departures: Desert Safari & BBQ</h2>
            <button className="erp-btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} onClick={() => setShowModal(true)}>
              + Schedule Departure
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>DATE</th>
                <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>TIME</th>
                <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>CAPACITY</th>
                <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>SOLD</th>
                <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 8px' }}>15-08-2026</td>
                <td style={{ padding: '16px 8px' }}>15:30</td>
                <td style={{ padding: '16px 8px' }}>50</td>
                <td style={{ padding: '16px 8px' }}>42</td>
                <td style={{ padding: '16px 8px' }}>
                  <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-secondary)', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>Active</span>
                </td>
                <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 500 }}>Edit</button>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 8px' }}>16-08-2026</td>
                <td style={{ padding: '16px 8px' }}>15:30</td>
                <td style={{ padding: '16px 8px' }}>50</td>
                <td style={{ padding: '16px 8px' }}>50</td>
                <td style={{ padding: '16px 8px' }}>
                  <span style={{ padding: '4px 8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>Sold Out</span>
                </td>
                <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 500 }}>Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="erp-card" style={{ width: '400px' }}>
            <h3 className="heading-2" style={{ marginBottom: '24px' }}>Schedule Departure</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label className="erp-label">Tour</label>
              <select className="erp-input" value={tourId} onChange={(e) => setTourId(e.target.value)}>
                <option value="tour-123">Desert Safari & BBQ</option>
                <option value="tour-456">City Sightseeing Tour</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="erp-label">Date (dd-mm-yyyy)</label>
              <input type="text" className="erp-input" placeholder="e.g. 15-08-2026" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="erp-label">Start Time</label>
                <input type="time" className="erp-input" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div>
                <label className="erp-label">Capacity</label>
                <input type="number" className="erp-input" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
              </div>
            </div>

            {error && <div style={{ color: 'var(--accent-danger)', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600 }}>{error}</div>}
            {success && <div style={{ color: 'var(--accent-secondary)', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600 }}>{success}</div>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="erp-btn" style={{ background: 'transparent', color: 'var(--text-secondary)' }} onClick={() => setShowModal(false)}>Cancel</button>
              <button className="erp-btn erp-btn-primary" onClick={handleCreateDeparture} disabled={loading}>
                {loading ? 'Saving...' : 'Save Departure'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

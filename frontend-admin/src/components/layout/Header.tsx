'use client';

export default function Header() {
  return (
    <header className="erp-header" style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Placeholder for Breadcrumbs or Search */}
        <div style={{ position: 'relative', width: '300px' }}>
          <input 
            type="text" 
            placeholder="Search bookings, invoices, customers..." 
            className="erp-input"
            style={{ padding: '8px 16px', fontSize: '0.9rem', borderRadius: '20px' }}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', position: 'relative' }}>
          {/* Bell Icon Placeholder */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--accent-danger)', width: '10px', height: '10px', borderRadius: '50%' }}></span>
        </button>
        
        <button className="erp-btn erp-btn-primary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
          New Booking
        </button>
      </div>
    </header>
  );
}

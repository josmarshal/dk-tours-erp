'use client';

export default function B2BAgentPortal() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="heading-1" style={{ marginBottom: '8px' }}>B2B Quotations</h1>
          <p className="text-muted">Manage agent quotations and convert to travel files.</p>
        </div>
        <button className="erp-btn erp-btn-primary">
          + New Quotation
        </button>
      </div>

      <div className="erp-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="heading-2">Recent Quotations</h2>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <input type="text" className="erp-input" placeholder="Search QTY-..." style={{ width: '200px' }} />
            <select className="erp-input" style={{ width: '150px' }}>
              <option>All Statuses</option>
              <option>Draft</option>
              <option>Converted</option>
              <option>Expired</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>QUOTATION NO</th>
              <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>B2B AGENT</th>
              <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>TOTAL (KWD)</th>
              <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>VALID UNTIL</th>
              <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem' }}>STATUS</th>
              <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 8px', fontWeight: 600 }}>QTY-9281</td>
              <td style={{ padding: '16px 8px' }}>Voyage Travel LLC</td>
              <td style={{ padding: '16px 8px' }}>1,250.00</td>
              <td style={{ padding: '16px 8px' }}>20-08-2026</td>
              <td style={{ padding: '16px 8px' }}>
                <span style={{ padding: '4px 8px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-warning)', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>Draft</span>
              </td>
              <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                <button className="erp-btn" style={{ background: 'var(--accent-secondary)', color: 'white', padding: '4px 12px', fontSize: '0.8rem' }}>Convert to Booking</button>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 8px', fontWeight: 600 }}>QTY-9280</td>
              <td style={{ padding: '16px 8px' }}>Voyage Travel LLC</td>
              <td style={{ padding: '16px 8px' }}>840.00</td>
              <td style={{ padding: '16px 8px' }}>12-08-2026</td>
              <td style={{ padding: '16px 8px' }}>
                <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-secondary)', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>Converted</span>
              </td>
              <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 500 }}>View Travel File</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

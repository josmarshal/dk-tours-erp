'use client';

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <h1 className="heading-1">Distribution Dashboard</h1>
      <p className="text-muted" style={{ marginBottom: '32px' }}>
        Overview of your ERP and B2B Agent activity.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Metric Card 1 */}
        <div className="erp-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="heading-2" style={{ margin: 0, fontSize: '1.1rem' }}>Total Sales (Month)</h3>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-secondary)', borderRadius: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>45,230 KWD</div>
          <div style={{ color: 'var(--accent-secondary)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 500 }}>
            ↑ 12.5% from last month
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="erp-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="heading-2" style={{ margin: 0, fontSize: '1.1rem' }}>Pending Quotations</h3>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-warning)', borderRadius: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>142</div>
          <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '8px' }}>
            Awaiting B2B Agent confirmation
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="erp-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="heading-2" style={{ margin: 0, fontSize: '1.1rem' }}>Active Tours</h3>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>24</div>
          <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '8px' }}>
            Running today
          </div>
        </div>

      </div>
    </div>
  );
}

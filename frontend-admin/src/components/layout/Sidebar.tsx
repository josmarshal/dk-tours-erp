'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Hotel Extranet', href: '/hotels' },
  { label: 'Tour Operator', href: '/tours' },
  { label: 'B2B Quotations', href: '/b2b' },
  { label: 'Corporate CRM', href: '/corporate' },
  { label: 'Financial Workflows', href: '/finance' },
  { label: 'Reports', href: '/reports' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="erp-sidebar">
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <img src="/logo.png" alt="DK Equipments" style={{ height: '120px', maxWidth: '250px', objectFit: 'contain', alignSelf: 'flex-start' }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.025em', marginTop: '12px' }}>
          ERP System
        </h2>
        <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '4px' }}>Advanced Distribution</p>
      </div>

      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <ul style={{ listStyle: 'none' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href} style={{ marginBottom: '4px' }}>
                <Link
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-md)',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'all var(--transition-fast)',
                    boxShadow: isActive ? '0 4px 14px 0 rgba(218, 41, 28, 0.39)' : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            JD
          </div>
          <div>
            <p style={{ fontWeight: 600 }}>John Doe</p>
            <p className="text-muted">Admin Role</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

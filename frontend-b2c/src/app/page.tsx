'use client';

export default function Home() {
  return (
    <div>
      <section className="b2c-hero">
        <div className="animate-hero" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            Extraordinary travel, <br/> crafted for you.
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '40px' }}>
            Discover thousands of hand-picked hotels and exclusive tours at unbeatable prices.
          </p>
        </div>

        {/* Unified Search Widget */}
        <div className="search-widget animate-hero" style={{ animationDelay: '0.2s' }}>
          
          <div className="search-input-group" style={{ flex: 1.5 }}>
            <label className="search-label">Where are you going?</label>
            <input type="text" className="search-input" placeholder="City, Hotel, or Tour" />
          </div>

          <div className="search-input-group">
            <label className="search-label">Dates</label>
            <input type="text" className="search-input" placeholder="dd-mm-yyyy" />
          </div>

          <div className="search-input-group">
            <label className="search-label">Guests</label>
            <input type="text" className="search-input" placeholder="2 Adults, 1 Room" />
          </div>

          <button className="b2c-btn" style={{ borderRadius: 'var(--radius-lg)' }}>
            Search
          </button>

        </div>
      </section>

      <section style={{ padding: '80px 5%', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>Featured Experiences</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* Card 1 */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop) center/cover' }}></div>
            <div style={{ padding: '24px' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>Desert Safari</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Dubai Premium Sunset Safari & BBQ</h3>
              <p className="text-muted" style={{ marginBottom: '16px' }}>6 Hours • Guided Tour</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>$120</span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Book Now →</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop) center/cover' }}></div>
            <div style={{ padding: '24px' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>5-Star Hotel</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>The Grand Plaza Resort</h3>
              <p className="text-muted" style={{ marginBottom: '16px' }}>Dubai Marina • Beachfront</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem' }}>$450</div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>$350</span><span className="text-muted" style={{ fontSize: '0.85rem' }}>/night</span>
                </div>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>View Rooms →</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

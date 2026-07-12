import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Tours - Book Hotels & Experiences",
  description: "Find the best deals on hotels, tours, and travel experiences worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Using Outfit for headings and Inter for body text for a vibrant B2C look */}
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="b2c-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.jpg" alt="DK Equipments" style={{ height: '100px', objectFit: 'contain' }} />
          </div>
          <nav style={{ display: 'flex', gap: '32px', fontWeight: 600 }}>
            <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Hotels</a>
            <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Tours</a>
            <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Special Offers</a>
          </nav>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="/login" style={{ background: 'transparent', border: 'none', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Sign In</a>
            <a href="/signup" className="b2c-btn" style={{ padding: '8px 20px', fontSize: '0.9rem', textDecoration: 'none' }}>Sign Up</a>
          </div>
        </header>
        
        <main>
          {children}
        </main>

        <footer style={{ background: 'white', padding: '60px 5%', marginTop: '80px', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>© 2026 Digital Tours. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

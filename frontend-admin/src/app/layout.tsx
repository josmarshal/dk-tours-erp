import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export const metadata: Metadata = {
  title: "Digital Tours ERP - Admin Portal",
  description: "Advanced Travel Management and B2B Distribution Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Using Inter font from Google Fonts for a modern, clean look */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="erp-layout">
          <Sidebar />
          <div className="erp-main-content">
            <Header />
            <main style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

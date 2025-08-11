import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>URL Shortener</h2>
        <nav>
          <Link to="/" style={{ marginRight: 12 }}>Home</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

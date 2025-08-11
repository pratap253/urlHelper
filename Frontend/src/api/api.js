const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

export async function shortenUrl(longUrl) {
  const res = await fetch(`${API_BASE}/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl: longUrl })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to shorten');
  }
  return res.json();
}

export async function fetchAdminList(adminPassword) {
  const url = new URL(`${API_BASE}/admin/list`);
  // send via header
  const res = await fetch(url.toString(), {
    headers: {
      'x-admin-password': adminPassword
    }
  });
  if (!res.ok) {
    const j = await res.json().catch(()=>null);
    throw new Error(j?.error || 'Failed to fetch admin list');
  }
  return res.json();
}

export function getShortUrl(shortCode) {
  return `${BASE_URL}/${shortCode}`;
}

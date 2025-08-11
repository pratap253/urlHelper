import React, { useState } from 'react';
import { fetchAdminList, getShortUrl } from '../api/api';
import './Admin.css';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [urls, setUrls] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    setErr('');
    setUrls(null);
    setLoading(true);
    try {
      const data = await fetchAdminList(password);
      setUrls(data);
    } catch (error) {
      setErr(error.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h3>Admin — list of short URLs</h3>
      <form onSubmit={handleFetch} className="admin-form">
        <input
          type="password"
          placeholder="admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </form>

      {err && <p className="error-text">{err}</p>}

      {urls && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Short</th>
              <th>Long URL</th>
              <th>Visits</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {urls.map(u => (
              <tr key={u._id}>
                <td>
                  <a href={getShortUrl(u.shortCode)} target="_blank" rel="noreferrer">
                    {getShortUrl(u.shortCode)}
                  </a>
                </td>
                <td style={{ wordBreak: 'break-all' }}>{u.longUrl}</td>
                <td>{u.clicks || 0}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { shortenUrl } from '../api/api';
import './Home.css'; // Import CSS file

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!longUrl) return setError('Please provide a URL');
    setLoading(true);
    try {
      const data = await shortenUrl(longUrl);
      setResult(data);
      setLongUrl('');
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <form className="home-form" onSubmit={handleSubmit}>
        <label>Enter long URL</label>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com/very/long/url"
          className="home-input"
        />
        <button type="submit" disabled={loading} className="home-button">
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>

      {error && <p className="home-error">{error}</p>}

      {result && (
        <div className="home-result">
          <p><strong>Short URL</strong></p>
          <a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
          <p><strong>Original</strong></p>
          <div className="original-url">{result.longUrl}</div>
        </div>
      )}
    </div>
  );
}

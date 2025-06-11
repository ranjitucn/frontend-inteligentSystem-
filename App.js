import React, { useState } from 'react';

function App() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startLat, setStartLat] = useState('');
  const [endLat, setEndLat] = useState('');
  const [startLon, setStartLon] = useState('');
  const [endLon, setEndLon] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/earthquakes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startTime,
        endTime,
        startLat: parseFloat(startLat),
        endLat: parseFloat(endLat),
        startLon: parseFloat(startLon),
        endLon: parseFloat(endLon),
      }),
    });

    const data = await response.json();
    console.log(data)
    setResults(data);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Search Earthquake Data by Lat/Lon</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Time:</label><br />
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Time:</label><br />
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Latitude:</label><br />
          <input
            type="number"
            step="0.0001"
            value={startLat}
            onChange={(e) => setStartLat(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Latitude:</label><br />
          <input
            type="number"
            step="0.0001"
            value={endLat}
            onChange={(e) => setEndLat(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Longitude:</label><br />
          <input
            type="number"
            step="0.0001"
            value={startLon}
            onChange={(e) => setStartLon(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Longitude:</label><br />
          <input
            type="number"
            step="0.0001"
            value={endLon}
            onChange={(e) => setEndLon(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: 10 }}>Submit</button>
      </form>

      <hr />

      <h2>Results:</h2>
      {results ? (
        results.length === 0 ? (
          <p>No earthquakes found for this query.</p>
        ) : (
          <ul>
            {results.map((eq, idx) => (
              <li key={idx}>
                Magnitude: {eq.magnitude}, Location: {eq.location || 'Unknown'}, Time: {new Date(eq.time).toLocaleString()}
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Please submit the form to see results.</p>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import MapComponent from './MapComponent';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function App() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true); // ✅ only load MapComponent when script is ready
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div className="App">
      <div className="App">
      {mapLoaded ? <MapComponent /> : <p>Loading map...</p>}
    </div>
    </div>
  );
}

export default App;

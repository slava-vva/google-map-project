import React, { useEffect, useRef } from 'react';
import axios from 'axios';

window.initMap = () => {}; // Dummy function required for the API script

function MapComponent() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -36.8485, lng: 174.7633 },
      zoom: 12,
    });

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        response.data.forEach(user => {
          new window.google.maps.Marker({
            position: {
              lat: -36.84 + Math.random() * 0.1,
              lng: 174.76 + Math.random() * 0.1,
            },
            map,
            title: user.name,
          });
        });
      })
      .catch(error => {
        console.error("Error fetching data", error);
      });

  }, []);

  return (
    <div>
      <h2>Google Map</h2>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default MapComponent;

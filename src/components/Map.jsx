import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import Layers from "./Layers";

const Map = ({ coords }) => {
  const { lat, lng } = coords;
  const [center, setCenter] = useState([51.505, -0.09]);
  const [zoom, setZoom] = useState(5);

  const mapRef = useRef();

  useEffect(() => {
    if (lat !== undefined) {
      const { current = {} } = mapRef;
      setCenter([lat, lng]);
      setZoom(17);
      current.flyTo(coords, 17);
    }
  }, [lat, lng]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={true}
      style={{ height: "100vh", width: "100%", padding: 0 }}
      ref={mapRef}
    >
      <Layers center={center} />
    </MapContainer>
  );
};

export default Map;

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import Layers from "./Layers";

const Map = ({ coords }) => {
  const { lat, lng } = coords;
  const [center, setCenter] = useState([51.505, -0.09]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (lat !== undefined) {
      setCenter([lat, lng]);
      setZoom(17);
    }
  }, [lat, lng]);

  console.log("center", center);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={true}
      style={{ height: "100vh", width: "100%", padding: 0 }}
    >
      <Layers center={center} />
    </MapContainer>
  );
};

export default Map;

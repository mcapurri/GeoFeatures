import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import Layers from "./Layers";

const Map = ({ coords }) => {
  const [lat, lon] = coords;
  const [center, setCenter] = useState([51.505, -0.09]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    setCenter([lat, lon]);
    setZoom(17);
  }, [lat, lon]);

  console.log(center);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={true}
      style={{ height: "100vh", width: "100%", padding: 0 }}
    >
      <Layers />
    </MapContainer>
  );
};

export default Map;

import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  useMapEvents,
} from "react-leaflet";

// import teslaData from "../data/tesla-sites.json";

// Base map tile:
const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Map = () => {
  // Set up a useState hook for our map instance:
  const [map, setMap] = useState(null);

  // function makeACall(bounds, zoom, zoomThreshold = 8) {
  //   console.log(`Current map zoom is ${zoom}`);
  //   if (zoom > zoomThreshold) {
  //     console.log("make a call to the server with the bounds:", bounds);
  //   }
  // }
  // const MapEvents = () => {
  //   const map = useMapEvents({
  //     moveend: () => makeACall(map.getBounds(), map.getZoom()),
  //     zoomend: () => makeACall(map.getBounds(), map.getZoom()),
  //   });
  //   return null;
  // };
  // L.Control.geocoder().addTo(map_init);

  // useEffect(() => {
  //   L.Control.geocoder().addTo(map);
  // }, [map]);

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        zoomControl={true}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        // Set the map instance to state when ready:
        whenCreated={(map) => setMap(map)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            {/* <MapEvents /> */}
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* {teslaData.map((site) => (
          <Marker
            key={site.id}
            position={[site.gps.latitude, site.gps.longitude]}
          ></Marker>
        ))} */}
      </MapContainer>
    </>
  );
};

export default Map;

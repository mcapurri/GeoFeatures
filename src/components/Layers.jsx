import React, { useCallback, useEffect, useState } from "react";
import {
  TileLayer,
  LayersControl,
  GeoJSON,
  useMap,
  useMapEvents,
} from "react-leaflet";
import * as L from "leaflet";
import osmtogeojson from "osmtogeojson";
import { v4 as uuid } from "uuid";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Layers = ({ center }) => {
  const [data, setData] = useState();

  const map = useMap();

  const placeholderIcon = L.icon({
    iconUrl: "marker.png",
    iconSize: [38, 38],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });
  const locationIcon = L.icon({
    iconUrl: "location.png",
    iconSize: [38, 38],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });

  const fetchData = useCallback(async () => {
    if (map.getZoom() < 17) {
      setData(null);
      return;
    }

    const response = await fetch(
      `https://www.openstreetmap.org/api/0.6/map?bbox=${map
        .getBounds()
        .getWest()},${map.getBounds().getSouth()},${map
        .getBounds()
        .getEast()},${map.getBounds().getNorth()}`
    );

    const osm = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(osm, "text/xml");

    const geoJson = osmtogeojson(xmlDoc);
    setData(geoJson);
  }, [map]);

  useEffect(() => {
    fetchData();
  }, [map]);

  useMapEvents({
    moveend: fetchData,
    zoomend: fetchData,
    dblclick: () => {
      map.locate(center);
    },
    locationfound: (e) => {
      map.flyTo(e.latlng, 17);
      L.marker(e.latlng, {
        icon: locationIcon,
        alt: "You are here",
      }).addTo(map);
    },
  });

  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="Map">
        {data && (
          <GeoJSON
            key={uuid()}
            data={data}
            pointToLayer={(_, latlng) => {
              const marker = L.marker(latlng, {
                icon: placeholderIcon,
              });

              return marker;
            }}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={maps.base}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default Layers;

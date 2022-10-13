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
import "leaflet/dist/leaflet.css";

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/lookup?";
const MAPS_BASE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const Layers = ({ center }) => {
  const [data, setData] = useState();
  const [infos, setInfos] = useState({});

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

  // const fetchInfos = async (feature) => {
  //   const params = {
  //     osm_ids: `${feature.id
  //       .replace("node/", "N")
  //       .replace("way/", "W")
  //       .replace("relation/", "R")}`,
  //     format: "json",
  //     addressdetails: 1,
  //     namedetails: 1,
  //     polygon_geojson: 0,
  //     extratags: 1,
  //   };

  //   const queryString = new URLSearchParams(params).toString();
  //   const response = await fetch(`${NOMINATIM_BASE}${queryString}`);
  //   const json = await response.json();
  //   setInfos(json[0]);
  // };

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
            onEachFeature={async (feature, layer) => {
              layer.on("click", async () => {
                const params = {
                  osm_ids: `${feature.id
                    .replace("node/", "N")
                    .replace("way/", "W")
                    .replace("relation/", "R")}`,
                  format: "json",
                  addressdetails: 1,
                  namedetails: 1,
                  polygon_geojson: 0,
                  extratags: 1,
                };

                const queryString = new URLSearchParams(params).toString();
                const response = await fetch(`${NOMINATIM_BASE}${queryString}`);
                const json = await response.json();
                await setInfos(json[0]);
              });

              layer.bindPopup(infos?.display_name, {
                className: "customPopup",
                maxWidth: "300px",
              });
            }}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={MAPS_BASE}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default Layers;

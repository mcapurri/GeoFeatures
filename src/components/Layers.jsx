import React, { useCallback } from "react";
import {
  TileLayer,
  LayersControl,
  GeoJSON,
  useMap,
  useMapEvents,
} from "react-leaflet";
import osmtogeojson from "osmtogeojson";
// import axios from "axios";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Layers = () => {
  const [data, setData] = React.useState();
  const map = useMap();
  // const [minLat, maxLat, minLng, maxLng] = bbox;

  // console.log("bbox", minLat, minLng, maxLat, maxLng);

  const fetchData = useCallback(async () => {
    console.log(map.getZoom());

    if (map.getZoom() < 17) {
      setData(null);
      return;
    }

    // const response1 = await axios(
    //   `https://www.openstreetmap.org/api/0.6/map?bbox=${minLat},${minLng},${maxLat},${maxLng}`
    // );
    // console.log("response1", response1.data);

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

  useMapEvents({
    moveend: fetchData,
    zoomend: fetchData,
  });

  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="Map">
        {data && <GeoJSON data={data} />}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={maps.base}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default Layers;

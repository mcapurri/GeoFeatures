import React, { useState } from "react";
import Map from "./components/Map";
import SearchBox from "./components/SearchBox";

function App() {
  const [coords, setCoords] = useState([]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SearchBox setCoords={setCoords} />
      <Map coords={coords} />
    </div>
  );
}

export default App;

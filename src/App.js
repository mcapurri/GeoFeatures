import React, { useState } from "react";
import Map from "./components/Map";
import SearchBox from "./components/SearchBox";

function App() {
  const [coords, setCoords] = useState([]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundImage: " linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%)",
      }}
    >
      <SearchBox setCoords={setCoords} />
      <div style={{ padding: "3% 3%" }}>
        <div style={{ border: "4px blue solid" }}>
          <Map coords={coords} />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Map from "./components/Map";
import Form from "./components/Form";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Form />
      <Map />
    </div>
  );
}

export default App;

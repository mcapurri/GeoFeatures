import React, { useState } from "react";
import axios from "axios";
import * as L from "leaflet";
import { OutlinedInput, Button } from "@mui/material";
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search?";

const SearchBox = ({ setCoords }) => {
  const [address, setAddress] = useState({
    street: "",
    houseNumber: "",
    city: "",
    postCode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    const params = {
      q: `${address.houseNumber}+${address.street},+${address.city},+${address.postCode}`,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
      limit: 1,
    };
    const queryString = new URLSearchParams(params).toString();

    const response = await axios.get(`${NOMINATIM_BASE}${queryString}`);
    const latLng = L.latLng(response?.data[0]?.lat, response?.data[0]?.lon);
    setCoords(latLng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
    setAddress({
      street: "",
      houseNumber: "",
      city: "",
      postCode: "",
    });
  };
  return (
    <div
      style={{
        height: "18vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        borderBottom: "2px solid blue",
        backgroundImage: " linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", width: "70vw", alignItems: "center" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "40vw" }}
          >
            <div
              style={{
                width: "40vw",
                display: "flex",
                justifyContent: "space-around",
                padding: "20px 10px 5px 10px",
                zIndex: "100",
              }}
            >
              <OutlinedInput
                value={address.street}
                placeholder="Street"
                name="street"
                onChange={(e) => {
                  setAddress({ ...address, [e.target.name]: e.target.value });
                }}
                style={{ background: "white" }}
              />
              <OutlinedInput
                value={address.houseNumber}
                placeholder="House #"
                name="houseNumber"
                onChange={handleChange}
                style={{ background: "white" }}
              />
            </div>
            <div
              style={{
                width: "40vw",
                display: "flex",
                justifyContent: "space-around",
                padding: "5px 10px",
              }}
            >
              <OutlinedInput
                value={address.postCode}
                placeholder="Post Code"
                name="postCode"
                onChange={handleChange}
                style={{ background: "white" }}
              />
              <OutlinedInput
                value={address.city}
                placeholder="City"
                name="city"
                onChange={handleChange}
                style={{ background: "white" }}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              style={{
                margin: "10px 25px",
                background: "white",
                color: "blue",
                border: "2px blue solid",
              }}
            >
              Search facilities
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;

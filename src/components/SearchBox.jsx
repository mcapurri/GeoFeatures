import React, { useState } from "react";
import axios from "axios";

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
    console.log(response.data[0]);
    setCoords([response.data[0].lat, response.data[0].lon]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("address", address);
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
        height: "12vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid blue",
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
              }}
            >
              <input
                value={address.street}
                type="text"
                placeholder="Street"
                name="street"
                onChange={handleChange}
              />
              <input
                value={address.houseNumber}
                type="text"
                placeholder="House #"
                name="houseNumber"
                onChange={handleChange}
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
              <input
                value={address.postCode}
                type="text"
                placeholder="Post Code"
                name="postCode"
                onChange={handleChange}
              />
              <input
                value={address.city}
                type="text"
                placeholder="City"
                name="city"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{
                margin: "10px 25px",
              }}
            >
              Search facilities
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;

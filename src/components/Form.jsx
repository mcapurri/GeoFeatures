import React, { useState } from "react";

const Form = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("address", address);
  };
  return (
    <div
      style={{
        height: "12vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid blue",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "50vw" }}
        >
          <div
            style={{
              width: "50vw",
              display: "flex",
              justifyContent: "space-around",
              padding: "20px 10px 5px 10px",
            }}
          >
            <input
              type="text"
              placeholder="Street"
              name="street"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              width: "50vw",
              display: "flex",
              justifyContent: "space-around",
              padding: "5px 10px",
            }}
          >
            <input
              type="text"
              placeholder="Post Code"
              name="postCode"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
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
      </form>
    </div>
  );
};

export default Form;

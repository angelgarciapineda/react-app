import React, { useState } from "react";

import "./App.css";
import { fetchNasa } from "./api/fetchNasa";
import Select from "react-select";
import BarWave from "react-cssfx-loading/lib/BarWave";

const queryInitialState = {
  sol: "",
  camera: "",
};

const options = [
  { value: "fhaz", label: "Fhaz" },
  { value: "rhaz", label: "Rhaz" },
  { value: "mast", label: "Mast" },
  { value: "chemcam", label: "Chemcam" },
  { value: "mahli", label: "Mahli" },
  { value: "mardi", label: "Mardi" },
  { value: "navcam", label: "Navcam" },
  { value: "pancam", label: "PanCam" },
  { value: "minites", label: "Mini-TES" },
];

function App() {
  const [query, setQuery] = useState(queryInitialState);
  const [camera, setCamera] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("");
    const data = await fetchNasa(query);
    if (data.photos.length > 0) {
      setLoading(false);
      setCamera(data.photos);
      setQuery(queryInitialState);
      console.log(data);
    } else {
      setLoading(false);
      setCamera([]);
      setQuery(queryInitialState);
      setMessage("No photos found");
      console.log("No photos found");
    }
  };

  return (
    <div className="main-container">
      <h1>NASA Mars Rover Photos</h1>
      <div className="main-inputs">
        <input
          type="number"
          placeholder="Insert a sol"
          value={query.sol}
          onChange={(e) => setQuery({ ...query, sol: e.target.value })}
          className="search"
        />
        <Select
          value={query.camera}
          onChange={(obj) => {
            setQuery({ ...query, camera: obj.value });
          }}
          options={options}
          width="300px"
        />
        <input
          type="submit"
          value="Search"
          onClick={() => {
            setLoading(true);
            handleSubmit();
          }}
          className="search"
        />
      </div>
      <div className="main-content">
        {loading && (
          <BarWave color="#fff" width="100px" height="100px" duration="3s" />
        )}
        {message && <h1>{message}</h1>}
        {camera.map((item, index) => (
          <div className="city" key={item.id ? item.id : index}>
            <h2 className="city-name">{item.id + " " + item.camera.name} </h2>
            <div className="city-temp">{item.camera.full_name}</div>
            <div className="info">
              <img
                className="city-icon"
                src={item.img_src}
                alt={item.earth_date}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

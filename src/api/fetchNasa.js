import axios from "axios";

const URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
const API_KEY = "hVyRRLCQWECWhUdrNz7P1c1mWMuwff5cQOV88oAQ";

export const fetchNasa = async ({ sol = 1000, camera = "fhaz" }) => {
  const { data } = await axios.get(URL, {
    params: {
      sol: sol,
      camera: camera,
      api_key: API_KEY,
    },
  });
  return data;
};

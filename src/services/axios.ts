import axios from "axios";

const Api = axios.create({
  // baseURL: "https://q8js630t-3000.inc1.devtunnels.ms/",
  baseURL : import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default Api;

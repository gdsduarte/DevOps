import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000", // Replace with your server's URL
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
import axios from "axios";

// Create an axios instance for all requests made from this instance
const http = axios.create({
  baseURL: "https://us-central1-devops-dorset.cloudfunctions.net/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
import axios from "axios";

const isDevelopment = process.env.NODE_ENV === 'development';

const http = axios.create({
  baseURL: isDevelopment ? "http://localhost:8080" : "http://35.242.175.209:8080",
  headers: {
    "Content-type": "application/json",
  },
});

export const fetchServerStatus = async () => {
  try {
    const response = await http.get("/api/server-status");
    console.log(response.data.status);
  } catch (error) {
    console.error("Error fetching server status:", error);
  }
};

export default http;
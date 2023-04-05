import Home from "../components/HomePage";
import Login from "../components/LoginPage";
import { useAuth } from "../services/AuthProvider";
import React, { useEffect } from "react";
import { fetchData } from "../services/fetchData"; // Import the fetchData function

function App() {
  const { user, role } = useAuth();

  useEffect(() => {
    const onSuccess = (response) => {
      console.log("Raw response data:", response);
      const jsonData = JSON.parse(response);
      console.log("Server status:", jsonData);
    };

    const onError = (error) => {
      console.error("Error fetching server status:", error);
    };

    fetchData("/api/server-status", onSuccess, onError);
  }, []);

  return (
    <div>
      {user ? <Home user={user} role={role} /> : <Login />}
    </div>
  );
}

export default App;
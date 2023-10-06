import Home from "../components/HomePage";
import Login from "../components/LoginPage";
import { useAuth } from "../services/AuthProvider";
import React from "react";

// App component
function App() {
  const { user, role } = useAuth();

  return (
    <div>
      {user ? <Home user={user} role={role} /> : <Login />}
    </div>
  );
}

export default App;
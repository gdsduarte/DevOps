import "firebase/auth";
import "firebase/database";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AuthProvider } from "./services/AuthProvider";
import { BrowserRouter } from "react-router-dom";

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap the app in the AuthProvider and BrowserRouter
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

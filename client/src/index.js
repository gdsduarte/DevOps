import "firebase/auth";
import "firebase/database";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { RoleProvider } from '../src/services/RoleProvider'; // Import the RoleProvider
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RoleProvider> {/* Wrap the App component with the RoleProvider */}
      <App />
    </RoleProvider>
  </BrowserRouter>
);
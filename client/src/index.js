/* import "firebase/auth";
import "firebase/database";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './login.html';
import CalendarPage from './calendar.html';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/calendar">
                    <CalendarPage />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>
);
 */

import "firebase/auth";
import "firebase/database";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;

import React from "react";
import Calendar from "./Calendar";
import "../assets/css/calendar.css";
import { logout } from "../services/firebase";

function Header() {
  return (
    <div className="header">
      <img src="../assets/img/logo_calendar.png" alt=""></img>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Main() {
  return (
    <section>
      <div className="column left">
        <h1 style={{ textAlign: "center", color: "grey" }}>9, February, 2023</h1>
        <div className="column left2">
          <h4 style={{ color: "grey", textAlign: "center" }}>Wednesday</h4>
          <ul>
            <li>
              <h5>Object Oriented Programming</h5>
            </li>
            <li>
              <h5>DataBase</h5>
            </li>
            <li>
              <h5>MobileApps</h5>
            </li>
            <li>
              <h5>FrontEnd</h5>
            </li>
            <li>
              <h5>DevOps</h5>
            </li>
          </ul>
        </div>
        <div className="column left3">
          <h4 style={{ color: "grey", textAlign: "center" }}>Notes</h4>
          <ul>
            <li>
              <h5>After Class Meeting</h5>
            </li>
            <li>
              <h5>After Class Meeting</h5>
            </li>
          </ul>
        </div>
      </div>
      <div className="column middle">
        <div className="button-bar-mid"></div>
        <Calendar /> {/* render the calendar component */}
      </div>
      <div className="column right">
        <h4 style={{ color: "grey" }}>Tags</h4>
        <ul>
          <li style={{ color: "red" }}>
            <h5>DevOps</h5>
          </li>
          <li style={{ color: "rgb(13, 16, 212)" }}>
            <h5>FrontEnd</h5>
          </li>
          <li style={{ color: "rgb(9, 170, 62)" }}>
            <h5>MobileApp</h5>
          </li>
          <li style={{ color: "rgb(255, 174, 0)" }}>
            <h5>DataBase</h5>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div className="footer">
    </div>
  );
}

function Home() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
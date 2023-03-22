
import React from "react";
import "../assets/css/calendar.css";
import Social from "./SocialMedia";
import { logout } from "../services/firebase";

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={require("../assets/img/logo_calendar.png")} alt=""></img>
      </div>
      <div class="profile_icon">
        <img src={require("../assets/img/logo_calendar.png")} alt="profile icon"></img>
        <div class="icon">&#8650;</div>
      </div>
      <button onClick={logout}>Logout</button>
    </header>
  );
}

function Main() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  const [dayOfWeek, monthAndDay, year] = formattedDate.split(', ');

  return (
    <section>
      <div className="main">
        <div className="left-side">
          <div className="column left">
            <h1 style={{ textAlign: "center", color: "grey" }} id="eventDayName">{formattedDate}</h1>
            <div style={{ textAlign: "center", color: "grey" }} id="eventDayName">
              <div>{dayOfWeek}</div>
              <div>{monthAndDay.replace(' ', '\n')}</div>
              <div>{year}</div>
            </div>
            <div className="column left2">
              <h4 style={{ color: "grey", textAlign: "left" }}>WEDNESDAY 11/02/2023</h4>
              <ul>
                <li style={{ color: "green" }}>
                  <h5>8:30 - Finish</h5>
                  <h5>Develop program interface</h5>
                </li>
              </ul>
              <h4 style={{ color: "grey", textAlign: "left" }}>THURSDAY 12/02/2023</h4>
              <ul>
                <li style={{ color: "maroon" }}>
                  <h5>8:30 - 9:00</h5>
                  <h5>Edit file</h5>
                </li>
              </ul>
              <h4 style={{ color: "grey", textAlign: "left" }}>MONDAY 13/02/2023</h4>
              <ul>
                <li style={{ color: "orange" }}>
                  <h5>8:30 - 11:30</h5>
                  <h5>Creating interface design</h5>
                </li>
              </ul>
              <h4 style={{ color: "grey", textAlign: "left" }}>MONDAY 14/02/2023</h4>
              <ul>
                <li style={{ color: "aqua" }}>
                  <h5>8:30 - Finish</h5>
                  <h5>Code hard</h5>
                </li>
              </ul>
              <h4 style={{ color: "grey", textAlign: "left" }}>WEDNESDAY 15/02/2023</h4>
              <ul>
                <li style={{ color: "red" }}>
                  <h5>12:30 - 16:00</h5>
                  <h5>Work on project</h5>
                </li>
              </ul>
              <h4 style={{ color: "grey", textAlign: "left" }}>MONDAY 16/02/2023</h4>
              <ul>
                <li style={{ color: "blue" }}>
                  <h5>8:30 - Finish</h5>
                  <h5>Finish design</h5>
                </li>
              </ul>
            </div>
            <div className="column left3">
              <h4 style={{ color: "grey", textAlign: "left" }}>NOTES</h4>
              <ul>
                <li>
                  <h5>Don't forget to talk with your classmates</h5>
                </li>
                <li>
                  <h5>After class happy hour on 4/20</h5>
                </li>
              </ul>
            </div>
          </div>
          <div className="column middle">
            <div className="button-bar-mid"></div>
            <div className="calendar-mid"></div>
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
          <div id="calendar" class="mid"></div>
          <div className="right-side">
            <div className="container_right">
              <h1 className="title">MODULES</h1>
              <ul>
                <li style={{ color: '#0084FF', backgroundColor: '#E6F3FF' }}>UX/UI</li>
                <br />
                <li style={{ color: '#FF00F5', backgroundColor: '#FFCDFD' }}>Operating Systems</li>
                <br />
                <li style={{ color: '#E92C2C', backgroundColor: '#FFEBEB' }}>DevOps</li>
                <br />
                <li style={{ color: '#FF9F2D', backgroundColor: '#FFF5E8' }}>MobileApps</li>
                <br />
                <li style={{ color: '#a1a30d', backgroundColor: '#FDFFAB' }}>Networking</li>
                <br />
                <li style={{ color: '#00BA34', backgroundColor: '#E6F8EB' }}>OOP</li>
                <br />
                <li style={{ color: '#848383', backgroundColor: '#E8E8E8' }}>Notes</li>
              </ul>
            </div>
            <div className="container_right2">
              <h1 className="title">DEADLINES</h1>
              <ul>
                <li style={{ color: '#0084FF', backgroundColor: '#E6F3FF' }}>3 Days Left</li>
                <br />
                <li style={{ color: '#FF00F5', backgroundColor: '#FFCDFD' }}>5 Days Left</li>
                <br />
                <li style={{ color: '#E92C2C', backgroundColor: '#FFEBEB' }}>1 Day Left</li>
                <br />
                <li style={{ color: '#FF9F2D', backgroundColor: '#FFF5E8' }}>6 Days Left</li>
                <br />
                <li style={{ color: '#a1a30d', backgroundColor: '#FDFFAB' }}>8 Days Left</li>
                <br />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="rows">
        <div className="column_left">
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of use</a></li>
          </ul>
        </div>
        <div class="column_mid">
          <Social />
        </div>
        <div class="column_right">
          <span>&#169;</span>
          <p>2023 Key. All Rights Reserved | Development Group</p>
        </div>
      </div>
    </footer>

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
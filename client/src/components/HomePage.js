import "../assets/css/calendar.css";
import Social from "./SocialMedia";
import { logout } from "../services/firebase";
import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import React, { useState } from "react";

const events = [
  {
    id: 1,
    title: "Event 1",
    start: "2023-03-30T10:00:00",
    end: "2023-03-30T12:00:00",
  },
  {
    id: 2,
    title: "Event 2",
    start: "2023-04-01T14:00:00",
    end: "2023-04-01T16:00:00",
  },
];


function Header() {
  return (
    <header>
      <div className="logo">
        <img src={require("../assets/img/logo_calendar.png")} alt=""></img>
      </div>
      <button onClick={logout}>Logout</button>
      <div className="profile_icon">
        <img src={require("../assets/img/logo_calendar.png")} alt="profile icon"></img>
      </div>
    </header>
  );
}

function Main() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  const [dayOfWeek, monthAndDay, year] = formattedDate.split(', ');
  const [currentEvents, setCurrentEvents] = useState([]);

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        {event.title}
      </li>
    );
  };


  return (
    <main>
      <section>
        <div className="left-side">
          <div className="column-today-date">
            <h1>{formattedDate}</h1>
          </div>
          {/* <div style={{ textAlign: "center", color: "grey" }} id="eventDayName">
              <div>{dayOfWeek}</div>
              <div>{monthAndDay}</div>
              <div>{year}</div>
            </div> */}
          <div id="EventList" className="column-events">
            <Sidebar currentEvents={events} renderSidebarEvent={renderSidebarEvent} />
          </div>
          <div className="notes-title">
            <h1>NOTES</h1>
          </div>
          <div className="column-notes">
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
        <div className="center">
          <div className="button-bar-mid"></div>
          <div className="calendar-mid">
            <Calendar events={events} />
          </div>
        </div>
        <div className="right-side">
          <div className="module-title">
            <h1>Modules</h1>
          </div>
          <div id="SubjectList" className="column-module">
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
          <div className="deadline-title">
            <h1>Deadline</h1>
          </div>
          <div id="DeadlineList"  className="column-deadline">
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
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="column_left">
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of use</a></li>
        </ul>
      </div>
      <div className="column_mid">
        <Social />
      </div>
      <div className="column_right">
        <span>&#169;</span>
        <p>2023 Key. All Rights Reserved | Development Group</p>
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
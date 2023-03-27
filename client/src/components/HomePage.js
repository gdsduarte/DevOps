import "../assets/css/calendar.css";
import Social from "./SocialMedia";
import { logout } from "../services/firebase";
import Calendar from "./Calendar";
import React, { useState } from "react";
import { Subjects, EventBar, DeadlineBar } from "./CalendarUtils";

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
  const [currentEvents, setCurrentEvents] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("All");

  return (
    <main>
      <section>
        <div className="left-side">
          <div className="column-today-date">
            <h1>{formattedDate}</h1>
          </div>
          <div className="column-events">
            <div className="events-title">
              <h1>Events</h1>
            </div>
            <EventBar events={currentEvents} />
          </div>
          <div className="notes-title">
            <h1>Notes</h1>
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
            <Calendar onEventsChange={setCurrentEvents} getEvents={currentEvents} />
          </div>
        </div>
        <div className="right-side">
          <div className="module-title">
            <h1>Modules</h1>
          </div>
          <div className="column-module">
            <ul>
              {Subjects.map((subject) => (
                <React.Fragment key={subject.name}>
                  <li
                    style={subject.style}
                    onClick={() => setSubjectFilter(subject.name)}
                  >
                    {subject.name}
                  </li>
                  <br />
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="deadline-title">
            <h1>Deadline</h1>
          </div>
          <div className="column-deadline">
            <h3 className="all-filter" onClick={() => setSubjectFilter("All")}>All</h3>
            <DeadlineBar events={currentEvents} subjectFilter={subjectFilter} />
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
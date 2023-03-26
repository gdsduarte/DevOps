import React from "react";
import "../assets/css/calendar.css";


const Sidebar = ({ events }) => {
  const renderSidebarEvent = (event) => {
    const endDay = event.end.toLocaleString("default", { weekday: "long" });
    const endDate = event.end.toLocaleString("default", { Date: "long" });
    const startTime = event.start.toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
    });
    const endTime = event.end.toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
    });

    const isDue = new Date() > event.end;

    return (
      <li key={event.id} className={isDue ? "due" : ""}>
        <span>{endDay}</span>
        <br />
        <span>{endDate}</span>
        <br />
        <strong>{event.subject}</strong>
        <br />
        {event.title}
      </li>
    );
  };

  const sortedEvents = events.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });

  const dueEvents = sortedEvents.filter((event) => new Date() > event.end);
  const upcomingEvents = sortedEvents.filter((event) => new Date() <= event.end);

  return (
    <div>
      <h3 className="event-subtile">Due Events</h3>
      <ul>{dueEvents.map(renderSidebarEvent)}</ul>
      <h3 className="event-subtile">Upcoming Events</h3>
      <ul>{upcomingEvents.map(renderSidebarEvent)}</ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { formatDate } from '@fullcalendar/core'

export function Sidebar({ currentEvents }) {
  return (
    <div className="sidebar">
      <h2>Events</h2>
      <ul>
        {currentEvents.map((event) => renderSidebarEvent(event))}
      </ul>
    </div>
  );
}

function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    )
  }

export default Sidebar;

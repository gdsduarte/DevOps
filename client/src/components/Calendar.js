import { useState } from "react";
import { formatDate } from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import DetailsModal from "./DetailsModal";
import { INITIAL_EVENTS, handleEventClick, createEventId } from '../services/eventUtils'

const colors = {
  UX_UI: "#E6F3FF",
  Operating_Systems: "#FFCDFD",
  DevOps: "#FFEBEB",
  MobileApps: "#FFF5E8",
  Networking: "#FDFFAB",
  OOP: "#E6F8EB",
  Notes: "#E8E8E8",
};

const state = {
  weekendsVisible: true,
  currentEvents: []
};


export function renderSidebar() {
  return (
    <div className='calendar-sidebar'>
      <div className='calendar-sidebar-section'>
        <h2>All Events ({state.currentEvents.length})</h2>
        <ul>
          {state.currentEvents.map(renderSidebarEvent)}
        </ul>
      </div>
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  )
}

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleEventClick = (clickInfo) => {
    // handle event click
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleDateSelect = (selectInfo) => {
    // handle date selection
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  };

  const handleEventAdd = (event) => {
    const newEvent = {
      title: event.title,
      subject: event.subject,
      start: event.start,
      end: event.end,
      description: event.description,
      color: colors[event.subject],
    };
    setEvents((events) => [...events, newEvent]);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={state.weekendsVisible}
      events={events}
      eventClick={handleEventClick}
      dateSelect={handleDateSelect}
      eventAdd={handleEventAdd}
      eventContent={renderEventContent}
      contentHeight={570}
      initialEvents={INITIAL_EVENTS}
      weekNumbers={true}
    />
  );
};

export default Calendar;

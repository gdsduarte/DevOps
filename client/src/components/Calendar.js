import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, handleEventClick } from '../services/eventUtils'
//import { formatEvent, createEvent, updateEvent, deleteEvent } from './eventUtils';
import TingleModal from '../routers/tingleModal';
import React from "react";
import * as FullCalendar from "@fullcalendar/react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const calendarOptions = {
  plugins: [dayGridPlugin],
  weekNumbers: true,
  weekNumbersWithinDays: true,
  fixedWeekCount: false,
  height: 'auto',
  contentHeight: 'auto',
  /* weekNumberContent: (weekNumber) => {
      if (weekNumber <= 4) {
          return weekNumber;
      }
      return '';
  }, */
  select: (info) => {
    const { start, end, jsEvent, view } = info;
    const eventSources = view.calendar.getEventSources();
    const events = [];
    eventSources.forEach((eventSource) => {
      const eventSourceEvents = eventSource.getEvents();
      eventSourceEvents.forEach((event) => {
        if (event.start < end && event.end > start) {
          events.push(event);
        }
      });
    });
    if (events.length >= 2) {
      alert('You cannot add more than 2 events on the same day');
      view.calendar.unselect();
    }
  },
};

const handleDateSelect = (selectInfo) => {
  TingleModal(selectInfo.view.calendar, selectInfo.startStr, selectInfo.endStr);
};

export default class EventCalendar extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  };

  /* constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: true,
      currentEvents: []
    };
    //this.handleDateSelect = this.handleDateSelect.bind(this);
    //this.handleEventClick = this.handleEventClick.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleEventAdd = this.handleEventAdd.bind(this);
    this.handleEventDelete = this.handleEventDelete.bind(this);
    this.handleEventRemove = this.handleEventRemove.bind(this);
  } */

  render() {
    return (
      <div className='calendar'>
        {/* {this.renderSidebar()} */}
        <div className='calendar-main'>
          <FullCalendar.default
            {...calendarOptions}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            eventAdd={this.handleEventAdd}
            eventChange={this.handleEventChange}
            eventRemove={this.handleEventRemove}
            events={[]}
            dateClick={handleDateSelect}
          />
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className='calendar-sidebar'>
        <div className='calendar-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }
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

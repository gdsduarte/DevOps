import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchEvents } from "../services/eventService";
import EventModal from "./EventModal";
import { getSubjectStyle } from "../components/CalendarUtils";

// Calendar component
const Calendar = ({ onEventsChange, user }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarRef, setCalendarRef] = useState(null);
  const [events, setEvents] = useState([]);

  // Load events from the database when the user logs in
  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
  
      // Filter out the notes created by other users 
      const filteredEvents = fetchedEvents.filter((event) => {
        return event.subject !== "Notes" || (user && event.createdByUserId === user.uid);
      });
  
      // Format the events for the calendar component 
      const updatedEvents = filteredEvents.map((event) => {
        const eventStyle = getSubjectStyle(event.subject);
        return {
          ...event,
          borderColor: eventStyle.backgroundColor,
          backgroundColor: eventStyle.backgroundColor,
          textColor: eventStyle.color,
          start: new Date(event.start),
          end: new Date(event.end),
        };
      });
  
      setEvents(updatedEvents);
    };
  
    // Load events only if the user is logged in
    if (user) {
      loadEvents();
    }
  }, [user]);
  
  // Count the number of overlapping events for a given date range 
  const countOverlappingEvents = (selectedRangeStart, selectedRangeEnd) => {
    const calendarApi = calendarRef.getApi();
    const events = calendarApi.getEvents();
    let overlappingEvents = 0;
  
    // Check if the selected date range overlaps with any existing events
    events.forEach((event) => {
      if (
        (selectedRangeStart >= event.start && selectedRangeStart < event.end) ||
        (selectedRangeEnd > event.start && selectedRangeEnd <= event.end) ||
        (selectedRangeStart < event.start && selectedRangeEnd > event.end)
      ) {
        overlappingEvents++;
      }
    });
  
    return overlappingEvents;
  };
  
  // Handle the click date event for the calendar component 
  const handleDateClick = (arg) => {
    const selectedRangeStart = new Date(arg.date);
    const selectedRangeEnd = new Date(arg.date);
    selectedRangeEnd.setDate(selectedRangeEnd.getDate() + 1);
  
    // Check if the selected date range overlaps with any existing events
    if (countOverlappingEvents(selectedRangeStart, selectedRangeEnd) >= 2) {
      alert("You cannot have more than 2 events on the same day.");
      return;
    }
  
    setSelectedEvent(null);
    setIsModalOpen(true);
  };
  
  // Handle the click event for the calendar component 
  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      subject: info.event._def.extendedProps.subject,
      start: info.event.start,
      end: info.event.end,
      description: info.event._def.extendedProps.description,
    });
    setIsModalOpen(true);
  };

  // Handle the add event event for the calendar component
  const handleEventAdd = (newEvent) => {
    const updatedEvent = {
      ...newEvent,
      borderColor: getSubjectStyle(newEvent.subject).backgroundColor,
      backgroundColor: getSubjectStyle(newEvent.subject).backgroundColor,
      textColor: getSubjectStyle(newEvent.subject).color,
    };
  
    // Add the event to the calendar component 
    calendarRef.getApi().addEvent(updatedEvent);
    onEventsChange([...events, updatedEvent]);
  };
  
  // Handle the update event event for the calendar component 
  const handleEventUpdate = (updatedEvent) => {
    const eventApi = calendarRef.getApi().getEventById(updatedEvent.id);
    if (eventApi) {
      eventApi.setProp('title', updatedEvent.title);
      eventApi.setProp('subject', updatedEvent.subject);
      eventApi.setDates(updatedEvent.start, updatedEvent.end);
      eventApi.setExtendedProp('description', updatedEvent.description);
      eventApi.setProp('backgroundColor', getSubjectStyle(updatedEvent.subject).backgroundColor);
    }

    // Update the event in the events list
    const updatedEventsList = events.map((event) => {
      return event.id === updatedEvent.id ? updatedEvent : event;
    });
    onEventsChange(updatedEventsList);
  };

  // Handle the delete event event for the calendar component
  const handleEventDelete = (deletedEventId) => {
    const eventApi = calendarRef.getApi().getEventById(deletedEventId);
    if (eventApi) {
      eventApi.remove();
    }

    // Remove the event from the events list
    const remainingEvents = events.filter((event) => event.id !== deletedEventId);
    onEventsChange(remainingEvents);
  };

  // Render the event content for the calendar component 
  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <div className="event-title">{eventInfo.event.title}</div>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        contentHeight={630}
        weekNumbers={true}
        ref={setCalendarRef}
        eventContent={renderEventContent}
        events={events}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        events={events}
      />
    </div>
  );
};

export default Calendar;

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchEvents } from "../services/eventService";
import EventModal from "./EventModal";
import { getEventColors } from "../services/eventUtils";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarRef, setCalendarRef] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      const updatedEvents = fetchedEvents.map((event) => {
        const eventColors = getEventColors(event.subject);
        return {
          ...event,
          ...eventColors,
          textColor: "black",
          start: new Date(event.start),
          end: new Date(event.end),
        };
      });
      setEvents(updatedEvents);
    };
  
    loadEvents();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const handleEventAdd = (newEvent) => {
    calendarRef.getApi().addEvent(newEvent);
  };

  const handleEventUpdate = (updatedEvent) => {
    const eventApi = calendarRef.getApi().getEventById(updatedEvent.id);
    if (eventApi) {
      eventApi.setProp('title', updatedEvent.title);
      eventApi.setProp('subject', updatedEvent.subject);
      eventApi.setDates(updatedEvent.start, updatedEvent.end);
      eventApi.setExtendedProp('description', updatedEvent.description);
      eventApi.setProp('backgroundColor', updatedEvent.backgroundColor);
    }
  };

  const handleEventDelete = (deletedEventId) => {
    const eventApi = calendarRef.getApi().getEventById(deletedEventId);
    if (eventApi) {
      eventApi.remove();
    }
  };

  const handleSelectOverlap = (selectionInfo) => {
    const overlappingEvents = selectionInfo.overlappingEvents;
    if (overlappingEvents.length >= 2) {
      alert("You cannot have more than 2 events on the same day.");
      return false;
    }
    return true;
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
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        contentHeight={570}
        weekNumbers={true}
        eventOverlap={false}
        selectOverlap={handleSelectOverlap}
        ref={setCalendarRef}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
      />
    </div>
  );
};

export default Calendar;

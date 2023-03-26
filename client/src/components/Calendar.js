import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchEvents } from "../services/eventService";
import EventModal from "./EventModal";
import { getEventColors } from "../services/eventUtils";

const Calendar = ({ onEventsChange, getEvents }) => {
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
      onEventsChange(updatedEvents);
    };

    loadEvents();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

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

  const handleEventAdd = (newEvent) => {
    calendarRef.getApi().addEvent(newEvent);
    onEventsChange([...getEvents, newEvent]);
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
    const updatedEvents = getEvents.map((event) => {
      return event.id === updatedEvent.id ? updatedEvent : event;
    });
    onEventsChange(updatedEvents);
  };

  const handleEventDelete = (deletedEventId) => {
    const eventApi = calendarRef.getApi().getEventById(deletedEventId);
    if (eventApi) {
      eventApi.remove();
    }
    const remainingEvents = getEvents.filter((event) => event.id !== deletedEventId);
    onEventsChange(remainingEvents);
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
        events={getEvents}
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

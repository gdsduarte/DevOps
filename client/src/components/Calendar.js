import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import { createEventId, INITIAL_EVENTS } from "../services/eventUtils";

function Calendar() {
  const [eventList, setEventList] = useState(INITIAL_EVENTS);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDateSelect = (selectInfo) => {
    setModalOpen(true);
  };

  const handleEventAdd = (event) => {
    const newEvent = {
      id: createEventId(),
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      color: colors[event.subject],
    };
    setEventList((eventList) => [...eventList, newEvent]);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const colors = {
    UXUI: "#E6F3FF",
    OperatingSystems: '#FFCDFD',
    DevOps: '#FFEBEB',
    MobileApps: '#FFF5E8',
    Networking: '#FDFFAB',
    OOP: '#E6F8EB',
    Notes: '#E8E8E8'
  };
  
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={eventList}
        select={handleDateSelect}
        contentHeight={570}
        weekNumbers={true}
      />
      <EventModal
        isOpen={modalOpen}
        closeModal={closeModal}
        onSave={handleEventAdd}
      />
    </>
  );
}

export default Calendar;

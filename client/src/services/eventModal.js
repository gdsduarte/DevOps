import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function EventModal({ show, onHide, event }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Start date: {event.start.toLocaleString()}</p>
        <p>End date: {event.end.toLocaleString()}</p>
        <p>Description: {event.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventModal from './EventModal';

function MyCalendar() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleDateClick(info) {
    // Set the selected event to the clicked date
    setSelectedEvent({
      title: 'New Event',
      start: info.date,
      end: info.date,
      description: '',
    });
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} dateClick={handleDateClick} />
      {selectedEvent && (
        <EventModal
          show={showModal}
          onHide={handleCloseModal}
          event={selectedEvent}
        />
      )}
    </div>
  );
}


import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createEvent, updateEvent, deleteEvent } from "../services/eventService";
import { getSubjectStyle } from "../components/CalendarUtils";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

Modal.setAppElement("#root");

const EventModal = ({ isOpen, onClose, event, onEventAdd, onEventUpdate, onEventDelete }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setSubject(event.subject);
      setStart(new Date(event.start).toISOString().slice(0, -8));
      setEnd(event.end ? new Date(event.end).toISOString().slice(0, -8) : "");
      setDescription(event.description);
    } else {
      setTitle("");
      setSubject("");
      setStart("");
      setEnd("");
      setDescription("");
    }
  }, [event]);


  const handleSave = async () => {
    const eventStyle = getSubjectStyle(subject);

    const newEvent = {
      title,
      subject,
      start: new Date(start),
      end: new Date(end),
      description,
      borderColor: eventStyle.backgroundColor,
      backgroundColor: eventStyle.backgroundColor,
      textColor: eventStyle.color,
    };

    if (event) {
      await updateEvent(event.id, newEvent);
      onEventUpdate({ ...newEvent, id: event.id });
    } else {
      const createdEvent = await createEvent(newEvent);
      onEventAdd({ ...newEvent, id: createdEvent.id });
    }
    onClose();
  };

  const handleDelete = async () => {
    if (event) {
      await deleteEvent(event.id);
      onEventDelete(event.id);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      shouldCloseOnOverlayClick={false}>
      <h2>{event ? "Edit Event" : "Add Event"}</h2>
      <form>
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <br />
        {!event && (
          <>
            <label>Subject:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="UX/UI">UX/UI</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="DevOps">DevOps</option>
              <option value="MobileApps">Mobile Apps</option>
              <option value="Networking">Networking</option>
              <option value="OOP">OOP</option>
              <option value="Notes">Notes</option>
            </select>
            <br />
          </>
        )}
        <br />
        <label>Start Time:</label>
        <input type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)} />
        <br />
        <label>End Time:</label>
        <input type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)} />
        <br />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
      </form>
      <br />
      <br />
      <button onClick={handleSave}>{event ? "Save Changes" : "Add Event"}</button>
      {event && <button onClick={handleDelete}>Delete</button>}
      <button onClick={handleCancel}>Cancel</button>
    </Modal>
  );
};

export default EventModal;

import React, { useState } from "react";
import Modal from "react-modal";
import { createEvent, updateEvent, deleteEvent } from "../services/eventService";
import { getEventColors } from "../services/eventUtils";

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
  const [title, setTitle] = useState(event ? event.title : "");
  const [subject, setSubject] = useState(event ? event.subject : "");
  const [start, setStart] = useState(event ? event.start : "");
  const [end, setEnd] = useState(event ? event.end : "");
  const [description, setDescription] = useState(event ? event.description : "");

  const handleSave = async () => {
    const eventColors = getEventColors(subject);

    const newEvent = {
      title,
      subject,
      start: new Date(start),
      end: new Date(end),
      description,
      ...eventColors,
      textColor: "black",
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
        <label>Subject:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">Select a subject</option>
          <option value="UXUI">UX/UI</option>
          <option value="OperatingSystems">Operating Systems</option>
          <option value="DevOps">DevOps</option>
          <option value="MobileApps">Mobile Apps</option>
          <option value="Networking">Networking</option>
          <option value="OOP">OOP</option>
          <option value="Notes">Notes</option>
        </select>
        <br />
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

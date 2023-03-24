import React from "react";
import Modal from "react-modal";
import axios from "./../services/http-common";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const DetailsModal = ({ event, isOpen, onRequestClose }) => {
  const [editing, setEditing] = React.useState(false);
  const [title, setTitle] = React.useState(event.title);
  const [subject, setSubject] = React.useState(event.subject);
  const [start, setStart] = React.useState(event.start);
  const [end, setEnd] = React.useState(event.end);
  const [description, setDescription] = React.useState(event.description);
  const [color, setColor] = React.useState(event.color);

  const handleUpdate = () => {
    const updatedEvent = {
      id: event.id,
      title,
      subject,
      start,
      end,
      description,
      color,
    };

    axios.put(`events/${event.id}`, updatedEvent)
      .then((response) => {
        console.log("Event updated successfully", response.data);
        onRequestClose();
      })
      .catch((error) => {
        console.error("Error updating event", error);
      });
  };

  const handleDelete = () => {
    axios.delete(`events/${event.id}`)
      .then((response) => {
        console.log("Event deleted successfully", response.data);
        onRequestClose();
      })
      .catch((error) => {
        console.error("Error deleting event", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Event Modal"
    >
      {editing ? (
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Subject:
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="1">Subject 1</option>
              <option value="2">Subject 2</option>
              <option value="3">Subject 3</option>
            </select>
          </label>
          <label>
            Start:
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label>
            End:
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
            <h2>{title}</h2>
            <p>Subject: {subject}</p>
            <p>Start: {start}</p>
            <p>End: {end}</p>
            <p>Description: {description}</p>
            <p>Color: {color}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
        )}
    </Modal>
    );
};

export default DetailsModal;



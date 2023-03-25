import React, { useState } from "react";
import Modal from "react-modal";
import axios from "../services/http-common";

const customModalStyles = {
  overlay: {
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "blue",
  },
};

const EventModal = ({ isOpen, closeModal, onSave }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const event = {
      title,
      subject,
      start,
      end,
      description,
    };

    axios.post("events", event)
    .then((response) => {
      console.log("Event saved successfully", response.data);
      onSave(event);
      closeModal();
    })
    .catch((error) => {
      console.error("Error saving event", error);
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <h2>Add Event</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
        <br />

        <label htmlFor="subject">Subject</label>
        <select id="subject" onChange={(e) => setSubject(e.target.value)}>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
        <br />

        <label htmlFor="start">Start Date</label>
        <input type="date" id="start" onChange={(e) => setStart(e.target.value)} />
        <br />

        <label htmlFor="end">End Date</label>
        <input type="date" id="end" onChange={(e) => setEnd(e.target.value)} />
        <br />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />

        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default EventModal;
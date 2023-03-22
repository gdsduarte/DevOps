import tingle from 'tingle.js';
import { INITIAL_EVENTS, createEventId } from '../services/eventUtils';
import '../index.css';

export const handleDateSelect = (selectInfo, calendarApi) => {
    let event = {
        id: createEventId(),
        title: "",
        subject: "",
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        dateStart: selectInfo.startStr,
        dateEnd: selectInfo.endStr,
        allDay: selectInfo.allDay,
        description: "",
        backgroundColor: "",
    };

    const handleTitleChange = (title) => {
        event.title = title;
        calendarApi.addEvent(event);
    };

    const handleSubjectChange = (subject) => {
        event.subject = subject;
    };

    const handleDateStartChange = (date) => {
        event.dateStart = date;
    };

    const handleDateEndChange = (date) => {
        event.dateEnd = date;
    };

    const handleDescriptionChange = (description) => {
        event.description = description;
    };

    const handleColorChange = (color) => {
        event.backgroundColor = color;
    };

    // check if modal is already open before creating a new one
    if (!document.querySelector('.tingle-modal')) {
        let modal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            overlay: true,
            closeMethods: ["overlay", "button", "escape"],
            closeLabel: "Close",
            cssClass: ["custom-class-1", "custom-class-2"],
            onOpen: function () { },
            onClose: function () { },
            beforeClose: function () {
                return true; // close the modal
            },
        });

        modal.setContent(
            `<form>
          <label>Event Title:</label>
          <input type="text" id="event-title" name="event-title"><br>
          <label>Subject:</label>
          <input type="text" id="event-subject" name="event-subject"><br>
          <label>Start Date:</label>
          <input type="datetime-local" id="event-start" name="event-start"><br>
          <label>End Date:</label>
          <input type="datetime-local" id="event-end" name="event-end"><br>
          <label>Description:</label>
          <textarea id="event-description" name="event-description"></textarea><br>
          <label>Background Color:</label>
          <input type="color" id="event-color" name="event-color"><br>
        </form>`
        );

        modal.addFooterBtn("Save", "tingle-btn tingle-btn--primary", () => {
            handleTitleChange(document.getElementById("event-title").value);
            handleSubjectChange(document.getElementById("event-subject").value);
            handleDateStartChange(document.getElementById("event-start").value);
            handleDateEndChange(document.getElementById("event-end").value);
            handleDescriptionChange(document.getElementById("event-description").value);
            handleColorChange(document.getElementById("event-color").value);
            modal.close();
        });

        modal.addFooterBtn("Cancel", "tingle-btn tingle-btn--danger", () => {
            modal.close();
        });

        modal.open();

        // Set the modal style
        modal.setContent(document.querySelector('form'));

        const modalElement = document.querySelector(".tingle-modal");
        modalElement.style.position = "fixed";
        modalElement.style.top = "50%";
        modalElement.style.left = "50%";
        modalElement.style.transform = "translate(-50%, -50%)";
        modalElement.style.width = "50%";
        modalElement.style.height = "50%";
        modalElement.style.borderRadius = "10px";
        modalElement.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.5)";
        modalElement.style.backgroundColor = "white";
        modalElement.style.zIndex = "1000";
    }
};

export default handleDateSelect;

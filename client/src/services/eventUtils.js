let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
    }
]

export function createEventId() {
    return String(eventGuid++)
}

export function handleEventClick(clickInfo) {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
    }
}

export function handleEvents(events) {
    this.setState({
        currentEvents: events
    });
}

export function handleEventChange(changeInfo) {
    console.log(changeInfo.event);
    console.log(changeInfo.oldEvent);
    console.log(changeInfo.revert);
}

export function handleDateClick(clickInfo) {
    console.log(clickInfo);
}

export function handleEventAdd(addInfo) {
    console.log(addInfo.event);
}

export function handleEventDelete(deleteInfo) {
    console.log(deleteInfo.event);
}

export function handleEventRemove(removeInfo) {
    console.log(removeInfo.event);
}

















/* export function formatEvent(event) {
    // Format event object for display in the calendar
    return {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end
    };
}

export function createEvent(event) {
    // Create a new event on the server
    return fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
        .then(data => formatEvent(data))
        .catch(err => console.error(err));
}

export function updateEvent(event) {
    // Update an existing event on the server
    return fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
        .then(data => formatEvent(data))
        .catch(err => console.error(err));
}

export function deleteEvent(eventId) {
    // Delete an existing event on the server
    return fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.ok) {
                return eventId;
            } else {
                console.error(`Failed to delete event with ID ${eventId}`);
            }
        })
        .catch(err => console.error(err));
}
 */
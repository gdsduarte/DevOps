//import { useState, useEffect } from 'react';
import firebase from './config/firebaseConfig';
//import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './eventUtils'

import React, { useEffect, useState } from 'react'
//import { formatEvent, createEvent, updateEvent, deleteEvent } from './eventUtils';

const calendarOptions = {
    plugins: [dayGridPlugin],
    weekNumbers: true,
    weekNumbersWithinDays: true,
    fixedWeekCount: false,
    height: 'auto',
    contentHeight: 'auto',
    /* weekNumberContent: (weekNumber) => {
        if (weekNumber <= 5) {
            return weekNumber;
        }
        return '';
    }, */
    select: (info) => {
        const { start, end, jsEvent, view } = info;
        const eventSources = view.calendar.getEventSources();
        const events = [];
        eventSources.forEach((eventSource) => {
            const eventSourceEvents = eventSource.getEvents();
            eventSourceEvents.forEach((event) => {
                if (event.start < end && event.end > start) {
                    events.push(event);
                }
            });
        });
        if (events.length >= 2) {
            alert('You cannot add more than 2 events on the same day');
            view.calendar.unselect();
        }
    },
};

export default class EventCalendar extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: []
    }

    render() {
        return (
            <div className='demo-app'>
                {/* {this.renderSidebar()} */}
                <div className='demo-app-main'>
                    <FullCalendar
                        {...calendarOptions}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        //you can update a remote database when these fire:
                        /* eventAdd={function () { }}
                        eventChange={function () { }}
                        eventRemove={function () { }} */
                        eventAdd={this.handleEventAdd}
                        eventChange={this.handleEventChange}
                        eventRemove={this.handleEventRemove}
                    />
                </div>
            </div>
        )
    }

    renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    handleEventClick = (clickInfo) => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

    handleEventAdd = (event) => {
        // handle event add
        console.log('Event added:', event);
    }

    handleEventChange = (event) => {
        // handle event change
        console.log('Event changed:', event);
    }

    handleEventRemove = (event) => {
        // handle event remove
        console.log('Event removed:', event);
    }
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
            <i>{event.title}</i>
        </li>
    )
}

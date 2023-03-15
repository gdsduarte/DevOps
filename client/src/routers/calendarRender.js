import React from 'react';
import calendarHtml from '../../public/calendar.html';

function CalendarPage() {
  return <div dangerouslySetInnerHTML={{ __html: calendarHtml }} />;
}

export default CalendarPage;


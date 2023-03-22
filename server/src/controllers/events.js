const { query } = require('../database');
const { validateEvent } = require('../validation');

async function getAllEvents(req, res) {
  try {
    const events = await query('SELECT * FROM events');
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

async function createEvent(req, res) {
  const { title, subject, dateStart, dateEnd, description, backgroundColor } = req.body;

  // Validate input
  const { error } = validateEvent({ title, subject, dateStart, dateEnd, description, backgroundColor });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await query('INSERT INTO events (title, subject, dateStart, dateEnd, description, backgroundColor) VALUES (?, ?, ?, ?, ?, ?)', [title, subject, dateStart, dateEnd, description, backgroundColor]);
    res.json({ id: result.insertId, title, subject, dateStart, dateEnd, description, backgroundColor });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

async function updateEvent(req, res) {
  const { id } = req.params;
  const { title, subject, dateStart, dateEnd, description, backgroundColor } = req.body;

  // Validate input
  const { error } = validateEvent({ title, subject, dateStart, dateEnd, description, backgroundColor });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await query('UPDATE events SET title = ?, subject = ?, dateStart = ?, dateEnd = ?, description = ?, backgroundColor = ? WHERE id = ?', [title, subject, dateStart, dateEnd, description, backgroundColor, id]);
    if (result.affectedRows === 0) return res.status(404).send('Event not found');
    res.json({ id, title, subject, dateStart, dateEnd, description, backgroundColor });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

async function deleteEvent(req, res) {
  const { id } = req.params;

  try {
    const result = await query('DELETE FROM events WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).send('Event not found');
    res.send(`Event with ID ${id} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };

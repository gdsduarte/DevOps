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
  const { title, start, end } = req.body;

  // Validate input
  const { error } = validateEvent({ title, start, end });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await query('INSERT INTO events (title, start, end) VALUES (?, ?, ?)', [title, start, end]);
    res.json({ id: result.insertId, title, start, end });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

async function updateEvent(req, res) {
  const { id } = req.params;
  const { title, start, end } = req.body;

  // Validate input
  const { error } = validateEvent({ title, start, end });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await query('UPDATE events SET title = ?, start = ?, end = ? WHERE id = ?', [title, start, end, id]);
    if (result.affectedRows === 0) return res.status(404).send('Event not found');
    res.json({ id, title, start, end });
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

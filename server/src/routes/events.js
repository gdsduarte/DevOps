const express = require('express');
const router = express.Router();
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getAllEvents);
router.post('/', authenticateToken, createEvent);
router.put('/:id', authenticateToken, updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);

module.exports = router;
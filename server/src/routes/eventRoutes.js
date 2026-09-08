const express = require('express');
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');
const { eventValidation, eventQueryValidation } = require('../utils/validators');

const router = express.Router();

// Browsing events now requires a logged-in account (any role)
router.get('/', protect, eventQueryValidation, getEvents);

// Organizer-only routes (declared BEFORE '/:id' so 'organizer' isn't parsed as an id)
router.get('/organizer/mine', protect, restrictTo('organizer'), getMyEvents);
router.post('/', protect, restrictTo('organizer'), eventValidation, createEvent);
router.put('/:id', protect, restrictTo('organizer'), updateEvent);
router.delete('/:id', protect, restrictTo('organizer'), deleteEvent);

// Event details also requires login (kept after the more specific organizer GET routes)
router.get('/:id', protect, getEventById);

module.exports = router;

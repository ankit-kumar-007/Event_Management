const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const eventService = require('../services/eventService');

// @route  GET /api/events?category=tech&search=hackathon&page=1&limit=10
// @access Public
const getEvents = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const result = await eventService.listEvents({ category, search, page, limit });
  res.status(200).json({ success: true, ...result });
});

// @route  GET /api/events/:id
// @access Public
const getEventById = asyncHandler(async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(error.statusCode || 400).json({ success: false, message: error.message });
  }
});

// @route  POST /api/events
// @access Private (organizer)
const createEvent = asyncHandler(async (req, res) => {
  const event = await eventService.createEvent(req.user._id, req.body);
  res.status(201).json({ success: true, event });
});

// @route  PUT /api/events/:id
// @access Private (organizer, owner only)
const updateEvent = asyncHandler(async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.user._id, req.body);
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(error.statusCode || 400).json({ success: false, message: error.message });
  }
});

// @route  DELETE /api/events/:id
// @access Private (organizer, owner only)
const deleteEvent = asyncHandler(async (req, res) => {
  try {
    await eventService.deleteEvent(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: 'Event deleted' });
  } catch (error) {
    res.status(error.statusCode || 400).json({ success: false, message: error.message });
  }
});

// @route  GET /api/events/organizer/mine
// @access Private (organizer)
const getMyEvents = asyncHandler(async (req, res) => {
  const events = await eventService.listEventsByOrganizer(req.user._id);
  res.status(200).json({ success: true, events });
});

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent, getMyEvents };

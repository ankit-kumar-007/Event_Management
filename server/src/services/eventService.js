const Event = require('../models/Event');

class EventError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Builds and runs a filtered, searchable, paginated event query.
 * Supports: ?category=tech&search=hackathon&page=1&limit=10
 */
const listEvents = async ({ category, search, page = 1, limit = 10 }) => {
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    Event.find(filter)
      .populate('organizer', 'name email')
      .sort(search ? { score: { $meta: 'textScore' } } : { date: 1 })
      .skip(skip)
      .limit(limit),
    Event.countDocuments(filter),
  ]);

  return {
    events,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const getEventById = async (id) => {
  const event = await Event.findById(id).populate('organizer', 'name email');
  if (!event) {
    throw new EventError('Event not found', 404);
  }
  return event;
};

const createEvent = async (organizerId, data) => {
  const event = await Event.create({ ...data, organizer: organizerId });
  return event.populate('organizer', 'name email');
};

const updateEvent = async (eventId, organizerId, data) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new EventError('Event not found', 404);
  }

  if (event.organizer.toString() !== organizerId.toString()) {
    throw new EventError('You are not authorized to edit this event', 403);
  }

  Object.assign(event, data);
  await event.save();
  return event.populate('organizer', 'name email');
};

const deleteEvent = async (eventId, organizerId) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new EventError('Event not found', 404);
  }

  if (event.organizer.toString() !== organizerId.toString()) {
    throw new EventError('You are not authorized to delete this event', 403);
  }

  await event.deleteOne();
  return event;
};

const listEventsByOrganizer = async (organizerId) => {
  return Event.find({ organizer: organizerId }).sort({ createdAt: -1 });
};

module.exports = {
  EventError,
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  listEventsByOrganizer,
};

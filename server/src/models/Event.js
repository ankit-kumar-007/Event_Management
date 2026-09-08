const mongoose = require('mongoose');

const CATEGORIES = ['tech', 'cultural', 'sports', 'workshop', 'music', 'business', 'other'];

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      enum: CATEGORIES,
      default: 'other',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String, // e.g. "18:30" - kept separate from date for simple display/filtering
      required: [true, 'Event time is required'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String, // URL to an image (upload handling can be added later)
      default: '',
    },
    ticketInfo: {
      type: String, // free-text: price, ticket tiers, seats available, etc.
      default: '',
    },
    registrationLink: {
      type: String, // Google Form link used for registration / ticket booking
      required: [true, 'Registration (Google Form) link is required'],
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Text index to support the search bar (title, description, venue)
eventSchema.index({ title: 'text', description: 'text', venue: 'text' });

// Helpful index for filtering by category + sorting by date
eventSchema.index({ category: 1, date: 1 });

eventSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('Event', eventSchema);

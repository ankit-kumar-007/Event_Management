const { body, query, validationResult } = require('express-validator');
const Event = require('../models/Event');

// Runs after a validation chain; sends 400 with field errors if any exist
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['organizer', 'user'])
    .withMessage('Role must be either "organizer" or "user"'),
  handleValidation,
];

const loginValidation = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

const eventValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category')
    .optional()
    .isIn(Event.CATEGORIES)
    .withMessage(`Category must be one of: ${Event.CATEGORIES.join(', ')}`),
  body('date').isISO8601().toDate().withMessage('A valid date is required'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('venue').trim().notEmpty().withMessage('Venue is required'),
  body('registrationLink')
    .trim()
    .isURL()
    .withMessage('registrationLink must be a valid URL (Google Form link)'),
  body('image').optional().trim().isURL().withMessage('image must be a valid URL'),
  body('ticketInfo').optional().trim(),
  handleValidation,
];

const eventQueryValidation = [
  query('category').optional().isIn(Event.CATEGORIES).withMessage('Invalid category filter'),
  query('search').optional().trim(),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  handleValidation,
];

module.exports = {
  handleValidation,
  registerValidation,
  loginValidation,
  eventValidation,
  eventQueryValidation,
};

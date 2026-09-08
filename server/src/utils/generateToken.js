const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Generates a signed JWT for a given user id + role.
 * Client is expected to store this in localStorage and send it as:
 *   Authorization: Bearer <token>
 */
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE,
  });
};

module.exports = generateToken;

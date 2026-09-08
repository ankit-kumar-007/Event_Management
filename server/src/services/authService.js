const User = require('../models/User');
const generateToken = require('../utils/generateToken');

class AuthError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AuthError('An account with this email already exists', 400);
  }

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id, user.role);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const loginUser = async ({ email, password }) => {
  // password has `select: false` on the schema, so it must be explicitly requested
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    throw new AuthError('Invalid email or password', 401);
  }

  const token = generateToken(user._id, user.role);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AuthError('User not found', 404);
  }
  return user;
};

module.exports = { AuthError, registerUser, loginUser, getUserById };

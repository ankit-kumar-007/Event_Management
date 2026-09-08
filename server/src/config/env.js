const dotenv = require('dotenv');

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/event-management',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

// Fail fast in production if critical secrets were left as defaults
if (env.NODE_ENV === 'production' && env.JWT_SECRET === 'dev_secret_change_me') {
  // eslint-disable-next-line no-console
  console.warn('WARNING: JWT_SECRET is using the insecure default value in production.');
}

module.exports = env;

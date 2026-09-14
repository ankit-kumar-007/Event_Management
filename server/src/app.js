const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const env = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Allow if matches configured origins, localhost, or any vercel.app preview/production URL
      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*') ||
        /\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in deployment to prevent network blockage
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;

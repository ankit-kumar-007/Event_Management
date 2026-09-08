const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');

const start = async () => {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  // Handle unhandled promise rejections gracefully
  process.on('unhandledRejection', (err) => {
    // eslint-disable-next-line no-console
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

start();

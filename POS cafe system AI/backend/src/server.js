import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5000;

// Start Server
const server = app.listen(PORT, () => {
  console.log(`[Server]: Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Force keep-alive for debugging
setInterval(() => {}, 1000 * 60 * 60);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection]: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

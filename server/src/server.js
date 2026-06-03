import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const PORT = env.PORT || 4000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running in ${env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start server:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

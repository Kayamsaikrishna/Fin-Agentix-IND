import app from './app';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import logger from './config/logger';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to databases
    await connectDatabase();
    await connectRedis();
    
    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 Fin-Agentix India API Server running on port ${PORT}`);
      logger.info(`📊 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

import Redis from 'redis';
import logger from './logger';

let redisClient: any;

export async function connectRedis() {
  try {
    redisClient = Redis.createClient({
      url: process.env.REDIS_URL
    });
    
    await redisClient.connect();
    logger.info('✅ Redis connected successfully');
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    throw error;
  }
}

export { redisClient };

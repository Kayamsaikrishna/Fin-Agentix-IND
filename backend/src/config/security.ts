
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Express } from 'express';

export const configureSecurity = (app: Express) => {
  // Set various HTTP headers for security
  app.use(helmet());

  // Enable Cross-Origin Resource Sharing (CORS)
  const corsOptions = {
    origin: 'http://localhost:3000', // Or your frontend URL
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  // Limit repeated requests to public APIs
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
};

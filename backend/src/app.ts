 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import rateLimit from 'express-rate-limit';
import secureJson from 'secure-json-parse';

// Routes
import authRoutes from './routes/auth';
import loanRoutes from './routes/loans';
import kycRoutes from './routes/kyc';

// Middleware
import { errorHandler } from './middleware/errorHandler';
import logger from './config/logger';

const app = express();

// Security middleware
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb', reviver: secureJson.reviver }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

// Logger middleware
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
}));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/loans', loanRoutes);
app.use('/api/v1/kyc', kycRoutes);

// Error handling
app.use(errorHandler);

export default app;

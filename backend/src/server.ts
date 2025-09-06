
import { app } from './app';
import { sequelize } from './database/connection';
import { router } from './routes';
import { securityMiddleware } from './middleware/security';
import { corsMiddleware } from './middleware/cors';
import { compressionMiddleware } from './middleware/compression';
import { logging } from './middleware/logging';
import { rateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

const PORT = process.env.PORT || 3000;

app.use(securityMiddleware);
app.use(corsMiddleware);
app.use(compressionMiddleware);
app.use(logging);
app.use(rateLimiter);

app.use('/api', router);

app.use(errorHandler);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

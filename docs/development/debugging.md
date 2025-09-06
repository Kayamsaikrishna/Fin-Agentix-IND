# Development/Debugging

This guide provides tips and strategies for debugging the Fin-Agentix backend.

## Logging

The application uses `winston` and `express-winston` for logging. All HTTP requests are automatically logged to the console. You can also import the logger from `./config/logger` and use it to add custom log messages in your code.

**Example:**

```typescript
import logger from './config/logger';

logger.info('This is an informational message.');
logger.error('This is an error message.');
```

## Using the Node.js Inspector

For more in-depth debugging, you can use the built-in Node.js inspector.

1.  **Start the application in inspect mode:**

    ```bash
    node --inspect dist/server.js
    ```

2.  **Open Chrome DevTools:**

    Open Google Chrome and navigate to `chrome://inspect`. You should see your application listed under "Remote Target". Click "inspect" to open the developer tools.

3.  **Set breakpoints:**

    You can now set breakpoints in your code, step through execution, and inspect variables just like you would in a browser environment.

## Error Handling

The application has a centralized error handler. All errors are caught and a standardized JSON response is sent. This makes it easier to identify and debug issues from the client-side.

For more details, see `backend/src/middleware/errorHandler.ts` and `backend/src/utils/errorHandler.ts`.

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Proxy to user-service
app.use('/api/v1/auth', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
}));

// Proxy to aadhaar-verification-service
app.use('/api/v1/aadhaar', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
}));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
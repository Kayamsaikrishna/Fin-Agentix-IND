
// src/config/environment.ts
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
export const DB_USER = process.env.DB_USER || 'user';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
export const DB_NAME = process.env.DB_NAME || 'fin_agentix';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

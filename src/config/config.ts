import dotenv from 'dotenv';

// Load .env file based on environment
dotenv.config({
  path: `configuration/.env.${process.env.NODE_ENV || 'development'}`
});

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || '',
  nodeEnv: process.env.NODE_ENV || 'development',
};

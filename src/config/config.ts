import dotenv from 'dotenv';

// Load .env file based on environment
dotenv.config({
  path: `configuration/.env.${process.env.NODE_ENV || 'development'}`
});

export const config = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  sessionSecret: process.env.SESSION_SECRET || 'some-secret',
  keycloak: {
    realm: process.env.KEYCLOAK_REALM || 'vre',
    authServerUrl: process.env.KEYCLOAK_URL || 'http://localhost:8080/auth',
    sslRequired: process.env.KEYCLOAK_SSL_REQUIRED || 'external',
    resource: process.env.KEYCLOAK_RESOURCE || 'lab_repository',
    confidentialPort: Number(process.env.KEYCLOAK_CONFIDENTIAL_PORT) || 0,
  },
  swaggerHost: process.env.SWAGGER_HOST || `localhost:${process.env.PORT || 3000}`,
  jwt: {
    jwksUri:
      process.env.JWT_CERTS_URL ||
      'http://localhost:8080/realms/vre/protocol/openid-connect/certs',
    issuer: process.env.JWT_ISSUER || 'http://localhost:8080/realms/vre',
    audience: process.env.JWT_AUDIENCE || 'nextjs-frontend',
  },
};

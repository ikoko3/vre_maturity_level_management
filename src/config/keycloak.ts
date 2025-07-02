import Keycloak from 'keycloak-connect';
import session from 'express-session';
import { config } from './config';

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore }, {
  realm: config.keycloak.realm,
  'auth-server-url': config.keycloak.authServerUrl,
  'ssl-required': config.keycloak.sslRequired,
  resource: config.keycloak.resource,
  'confidential-port': config.keycloak.confidentialPort,
});

export { keycloak, memoryStore };

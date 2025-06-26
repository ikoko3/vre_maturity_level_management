import Keycloak from 'keycloak-connect';
import session from 'express-session';

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak({ store: memoryStore }, {
  "realm": "vre",
  "auth-server-url": "http://localhost:8080/auth",
  "ssl-required": "external",
  "resource": "lab_repository",
  "confidential-port": 0
});

export { keycloak, memoryStore };

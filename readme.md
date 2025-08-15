Service to manage Readiness Levels for Virtual Research Environments.

## Configuration

Runtime values are read from environment variables. Example configuration files
are provided in the `configuration` folder:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/vre_level
NODE_ENV=development
SESSION_SECRET=dev-secret
KEYCLOAK_REALM=vre
KEYCLOAK_URL=http://localhost:8080/auth
KEYCLOAK_SSL_REQUIRED=external
KEYCLOAK_RESOURCE=lab_repository
KEYCLOAK_CONFIDENTIAL_PORT=0
SWAGGER_HOST=localhost:3000
JWT_CERTS_URL=http://localhost:8080/realms/vre/protocol/openid-connect/certs
JWT_ISSUER=http://localhost:8080/realms/vre
JWT_AUDIENCE=nextjs-frontend
```

Adjust the values as needed for your environment.

## Docker

This project includes a `Dockerfile` so the service can run inside a container
or locally on your machine.

* Running locally uses the settings from `configuration/.env.development`.
* The Docker image sets `NODE_ENV=docker` and therefore loads
  `configuration/.env.docker`, which points to Docker&nbsp;Compose service URLs
  instead of localhost.

To build and run the container:

```bash
docker build -t vre-levels .
docker run --env-file configuration/.env.docker -p 3000:3000 vre-levels
```

Adjust the compose service names in `.env.docker` if your setup differs.

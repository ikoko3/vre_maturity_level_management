# POC: run TypeScript directly with tsx
FROM node:20-alpine
WORKDIR /app

# Install deps (uses lockfile if present)
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy source
COPY . .

# Optional, but fine: set your env
ENV NODE_ENV=docker

EXPOSE 3000

# Run via tsx so .ts works
CMD ["npx", "tsx", "src/index.ts"]

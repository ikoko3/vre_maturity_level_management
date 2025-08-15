# Use official Node.js image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json tsconfig.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Use docker-specific environment configuration
ENV NODE_ENV=docker

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

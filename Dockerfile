# Use official Node.js LTS image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy app source
COPY . .

# Expose application and debug ports
EXPOSE 3000 9229

# Enable Node.js inspector for debugging
ENV NODE_OPTIONS=--inspect=0.0.0.0:9229

# Default command
CMD ["npm", "run", "dev"]

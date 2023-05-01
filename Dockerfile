# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code to the container
COPY . ./

# Build the application for production
RUN npm run build

# Expose port 80 to the host
EXPOSE 80

# Start the server
CMD ["npm", "start"]

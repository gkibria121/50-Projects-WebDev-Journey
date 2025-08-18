# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install  

# Copy all files
COPY . .



# Expose port
EXPOSE 3000

# Default command to run the app
CMD ["npm", "start"]

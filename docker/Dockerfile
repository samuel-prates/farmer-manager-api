# Use official Node.js image as base
FROM node:22-alpine

COPY docker/CA-ROOT-AM.crt /usr/local/share/ca-certificates

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
# Install PostgreSQL client for debugging connectivity issues
RUN apk add --no-cache postgresql-client \
    && apk add --no-cache curl \
    && apk add --no-cache openssl \
    && apk add --no-cache ca-certificates \
    && update-ca-certificates
# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port (change if needed)
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
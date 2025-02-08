# Dockerfile (Production)
FROM node:23-alpine3.20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose API port
EXPOSE 3000

CMD ["npm", "start"]

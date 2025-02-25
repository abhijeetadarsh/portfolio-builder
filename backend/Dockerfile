# Dockerfile (Production)
FROM node:23-alpine3.20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install --only=production

# Copy source code
COPY . .

# Expose API port
EXPOSE 3000

CMD ["pnpm", "start"]

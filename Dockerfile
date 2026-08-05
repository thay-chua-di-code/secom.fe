# =========================
# Build Stage
# =========================
FROM node:18.18-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL=https://api.aidr.io.vn
ARG VITE_SIGNALR_URL=https://api.aidr.io.vn/notifications
ARG VITE_CHAT_SOCKET_URL=wss://api.aidr.io.vn/chat

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_SIGNALR_URL=${VITE_SIGNALR_URL}
ENV VITE_CHAT_SOCKET_URL=${VITE_CHAT_SOCKET_URL}

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# =========================
# Production Stage
# =========================
FROM node:18.18-alpine AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

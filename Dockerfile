FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

# 🔥 COPIAR CONFIG
COPY nginx.conf /etc/nginx/nginx.conf

# 🔥 COPIAR BUILD
COPY --from=builder /app/dist/iceplay /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
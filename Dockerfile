# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built static assets
COPY --from=build /app/dist /usr/share/nginx/html

# Cloud Run expects the container to listen on the port defined by the PORT environment variable
# We handle this in the nginx config
ENV PORT 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

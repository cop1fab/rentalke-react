# Use a stable Node.js image
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Clean up dependencies before installing (Fix Rollup issue)
RUN rm -rf node_modules package-lock.json \
  && npm cache clean --force \
  && npm install --legacy-peer-deps

# Copy the entire React app
COPY . .

# Reinstall dependencies and rebuild esbuild
RUN npm install --legacy-peer-deps && npm rebuild esbuild

# Build the app
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

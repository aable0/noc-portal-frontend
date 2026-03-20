FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Pass build args to environment variables so React can bake them into the build
ARG REACT_APP_SERVER_IP
ARG REACT_APP_GOOGLE_CLIENT

ENV REACT_APP_SERVER_IP=$REACT_APP_SERVER_IP
ENV REACT_APP_GOOGLE_CLIENT=$REACT_APP_GOOGLE_CLIENT

# Build the app to be served statically
RUN npm run build

# Install a lightweight static server
RUN npm install -g serve

EXPOSE 3000

# Serve the static build with single-page-app routing enabled (-s)
CMD ["serve", "-s", "build", "-l", "3000"]

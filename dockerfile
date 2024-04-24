# Use the official Node.js 20 image as base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

RUN yarn global add @quasar/cli
# Copy package.json and yarn.lock to the working directory
COPY movieApp/package.json movieApp/yarn.lock ./
# Copy package.json and package-lock.json to the working directory

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY movieApp/ .

# Build the Quasar application
RUN yarn run quasar build

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD [ "quasar", "serve", "dist/spa","-p", "8080"]
# Step 1: Use an official Node.js image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the entire source code into the container
COPY . .

# Step 6: Expose the port your app will run on
EXPOSE 8080

# Step 7: Start the application
CMD ["npm", "run", "dev"]
# CMD npm run build && npm start
# To-Do App

This To-Do application is a full-stack project that allows users to manage their daily tasks efficiently. The frontend of the application is built using **React.js**, providing a dynamic and responsive user interface. The backend is developed with **Node.js** and **Express.js**, ensuring robust server-side operations and API handling. The application also integrates with **MongoDB** for database management, storing all user tasks securely.
### Demo Video
https://github.com/user-attachments/assets/4fc0d243-90a1-4c6b-9b03-36d688e1ba7a


## Features
- **Add Tasks:** Users can easily add new tasks to their to-do list.
- **Edit Tasks:** Existing tasks can be edited to update their details.
- **Delete Tasks:** Users can remove tasks that are no longer needed.
- **Responsive UI:** The frontend is styled using **CSS** and enhanced with icons for better user experience.
- **Dynamic Updates:** The task list updates dynamically as users interact with the application.

## Tech Stack
- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git, GitHub

## Installation and Setup

### 1. Install Node.js
- First, ensure that Node.js is installed on your system. You can download it from the [Node.js official website](https://nodejs.org/).
- After installation, verify the Node.js installation by checking the version:
  ```bash
  node -v
  npm -v
  ```
### 2. Install MongoDB and MongoDB Compass
- Download and install MongoDB from the MongoDB official website.
- After installing MongoDB, install MongoDB Compass.

### 3. Create a React App
In your project directory, create a new React app and navigate to the client directory::
```bash
npx create-react-app client
cd client
```
### 4. Install Frontend Dependencies
Install the necessary dependencies for the React frontend:
```bash
npm install
```
### 5. Set Up Backend with Node.js, Express, and MongoDB
In your project directory, set up the backend with Node.js:
```bash

mkdir server
cd server
npm init -y
npm install express mongoose cors
```
- Create a connection to MongoDB using Mongoose.
### 6. Run the Application
- Start the backend server:

```bash
cd server
npm start
```
- Start the frontend React app:
```bash
cd ../client
npm start
```
- The frontend will run on http://localhost:3000, and the backend API will run on http://localhost:5000 (or the port you specified).

### 7. Open the App in Your Browser
Visit http://localhost:3000 to see the frontend of the application.





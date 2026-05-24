# Aether Logistix (LogisticOS)

A modern, real-time Transport & Logistics Management Platform built with the MERN stack (MongoDB, Express, React, Node.js). 

This platform features a dynamic frontend styled with TailwindCSS and a robust backend utilizing Socket.io for real-time telemetry, drag-and-drop shipment tracking, and dashboard KPI syncing.

---

## 🚀 Tech Stack

- **Frontend:** React (Vite), TypeScript, TailwindCSS, Lucide-React, dnd-kit (for drag and drop), Axios, Socket.io-client.
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io, JSON Web Tokens (JWT), Cors.

---

## ⚙️ Environment Configuration

Before running the application locally, you will need to configure environment variables for both the client and the server.

### Backend (`/server`)
Create a `.env` file in the `server` directory and add the following keys:
```env
# Server Port
PORT=8080

# MongoDB Connection String (Replace with your actual MongoDB URI)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/logisticos?retryWrites=true&w=majority

# JWT Secret Key for Authentication
JWT_SECRET=your_super_secret_jwt_key
```

### Frontend (`/client`)
If you intend to test locally, you can change the backend API endpoints in the client files (e.g., `src/socket.ts`, `src/pages/TrackingPage.tsx`, etc.) from the production URL back to `http://localhost:8080`.

---

## 💻 Local Setup & Run Procedures

Follow these steps to get the application running on your local machine:

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd LogisticOS
```

### 2. Start the Backend Server
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the development server (uses nodemon)
npm run dev
# Or start normally
# npm start
```
*The backend should now be running on `http://localhost:8080` (or your defined PORT) and connected to MongoDB.*

### 3. Start the Frontend Client
Open a **new terminal tab/window** and run:
```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend should now be running on `http://localhost:5173`.*

---

## 🏗️ Building for Production

To build the frontend for production deployment (e.g., Vercel, Netlify):

```bash
cd client
npm run build
```
This will compile the TypeScript and generate a `dist/` folder containing the highly optimized production static files.

---

## ✨ Key Features
- **Real-Time Telemetry:** Live driver tracking, vehicle status, and weather integration.
- **Interactive Shipment Board:** Kanban-style drag and drop interface using `@dnd-kit`.
- **Global Search:** Trace shipments instantly by their Tracking ID.
- **Live Sync:** Instant updates across multiple clients via Socket.io WebSockets.
- **Responsive UI:** Clean, dark-mode focused glassmorphism UI optimized for Desktop and Mobile.

---

## 📝 License
This project is proprietary software for Aether Logistix. All rights reserved.

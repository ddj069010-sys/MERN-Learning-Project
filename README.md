# MERN Stack Development Project

This is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. It serves as a learning project for understanding full-stack development concepts.

## Project Structure

- **Backend**: Contains the server-side code (Express, MongoDB).
- **frontend**: Contains the client-side code (React).

## Technologies Used

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **cors**: For handling Cross-Origin Resource Sharing.
- **dotenv**: For loading environment variables.

### Frontend
- **React**: Library for building user interfaces.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests.

## getting Started

### Prerequisites
- Node.js installed
- MongoDB installed or a MongoDB Atlas connection string

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```
   - Create a `.env` file in the `Backend` directory and add your environment variables (e.g., `MONGO_URI`, `PORT`).

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. **Start the Backend:**
   ```bash
   cd Backend
   npm run dev
   # or
   npm start
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   The application should now be running, typically with the frontend on `http://localhost:3000` and the backend on a specified port (e.g., `5000`).

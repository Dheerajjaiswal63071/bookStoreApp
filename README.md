# BookStore Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing and displaying books/courses.

## Features

- 📚 Display books/courses from database
- 🆓 Filter and display free courses
- 💰 Paid courses with pricing
- 🌙 Dark/Light theme toggle
- 👤 User authentication (signup/login)
- 📱 Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your local machine:
```bash
# On Windows (if installed as a service)
# MongoDB should start automatically

# On macOS/Linux
mongod
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This will populate the database with sample books/courses.

### 4. Start Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:4000`

### 5. Frontend Setup

```bash
cd frontend
npm install
```

### 6. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /book` - Get all books
- `POST /book` - Create a new book
- `POST /user/signup` - User registration
- `POST /user/login` - User login

## Database Schema

### Book Model
```javascript
{
  name: String,      // Book/course name
  price: Number,     // Price (0 for free)
  category: String,  // "Free" or "Paid"
  image: String,     // Image URL
  title: String      // Description
}
```

## Troubleshooting

1. **Database Connection Error**: Make sure MongoDB is running on `localhost:27017`
2. **No Books Displayed**: Run `npm run seed` in the backend directory
3. **CORS Error**: The backend is configured with CORS for localhost development
4. **Port Already in Use**: Change the port in `backend/index.js` if needed

## Project Structure

```
bookStore/
├── backend/
│   ├── controller/
│   ├── model/
│   ├── route/
│   ├── index.js
│   └── seedData.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   └── ...
    └── ...
```

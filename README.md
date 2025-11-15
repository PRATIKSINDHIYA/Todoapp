# Todo List Application - Full Stack Assignment

A fully functional Todo List application built with React, TypeScript, Node.js, and MongoDB. This application includes user authentication with JWT, complete CRUD operations for todos, and a modern, responsive UI.

## 🚀 Features

### User Management
- ✅ User Signup
- ✅ User Sign-in (Login)
- ✅ User Forgot/Reset Password
- ✅ JWT-based Authentication

### Todo Management
- ✅ Create Todo
- ✅ Update Todo
- ✅ List Todos
- ✅ Delete Todo
- ✅ Mark Todo as Completed or Not Completed

### Backend Features
- ✅ Proper error handling in all routes
- ✅ All backend errors logged to MongoDB (separate collection)
- ✅ MongoDB Atlas integration
- ✅ TypeScript-only implementation (no JavaScript files)

### Frontend Features
- ✅ React Router for routing
- ✅ Zustand for global state management
- ✅ React Query with Zod schemas for API data fetching
- ✅ React Hook Form for form handling
- ✅ Modern, responsive UI with good UX
- ✅ TypeScript-only implementation (no JavaScript files)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier is sufficient)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "fully functional Todo List application"
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

**Important:** Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas connection string. You can get this from your MongoDB Atlas dashboard.

**Important:** Replace `your_jwt_secret_key_here` with a strong, random secret key for JWT token signing.

Start the backend server:

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

(Optional) Create a `.env` file in the `frontend` directory if you want to customize the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will run on `http://localhost:3000`

## 📁 Project Structure

```
fully functional Todo List application/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB models (User, Todo, ErrorLog)
│   │   ├── routes/          # API routes (auth, todos)
│   │   ├── middleware/      # Authentication and error handling middleware
│   │   ├── utils/           # Utility functions (JWT, logger)
│   │   └── index.ts         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                 # Environment variables (create this)
├── frontend/
│   ├── src/
│   │   ├── api/             # API client and schemas
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand store
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## 🔌 API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/signin` - Sign in with email and password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Todo Endpoints (Requires Authentication)

- `GET /api/todos` - Get all todos for the authenticated user
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

All todo endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Schema

### User Collection
- `email` (String, unique, required)
- `password` (String, hashed, required)
- `name` (String, required)
- `resetPasswordToken` (String, optional)
- `resetPasswordExpires` (Date, optional)
- `createdAt` (Date, auto)
- `updatedAt` (Date, auto)

### Todo Collection
- `title` (String, required)
- `description` (String, optional)
- `completed` (Boolean, default: false)
- `userId` (ObjectId, reference to User, required)
- `createdAt` (Date, auto)
- `updatedAt` (Date, auto)

### ErrorLog Collection
- `message` (String, required)
- `stack` (String, optional)
- `route` (String, optional)
- `method` (String, optional)
- `userId` (ObjectId, optional)
- `timestamp` (Date, auto)
- `createdAt` (Date, auto)
- `updatedAt` (Date, auto)

## 🔐 Authentication Flow

1. User signs up or signs in
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in localStorage (via Zustand persist)
4. All subsequent API requests include the token in the Authorization header
5. Backend middleware validates the token on protected routes

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds, smooth animations, and clean layouts
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **User Feedback**: Loading states, error messages, and success notifications
- **Intuitive Navigation**: Clear routing and protected routes
- **Form Validation**: Real-time validation using Zod schemas and React Hook Form

## 🧪 Testing the Application

1. **Sign Up**: Create a new account with name, email, and password
2. **Sign In**: Log in with your credentials
3. **Create Todo**: Click "Add Todo" and fill in the form
4. **Update Todo**: Click "Edit" on any todo to modify it
5. **Toggle Completion**: Click the checkbox to mark todos as complete/incomplete
6. **Delete Todo**: Click "Delete" to remove a todo (with confirmation)
7. **Forgot Password**: Use the forgot password flow to reset your password

## 📝 Assumptions Made

1. **Password Reset Token**: In production, the reset token would be sent via email. For this implementation, the token is returned in the API response for testing purposes. In a production environment, you would integrate with an email service (e.g., SendGrid, AWS SES).

2. **JWT Token Expiration**: Tokens expire after 7 days (configurable via `JWT_EXPIRES_IN` environment variable).

3. **Error Logging**: All errors are logged to MongoDB for debugging and monitoring purposes. The ErrorLog collection can be queried to analyze application errors.

4. **CORS**: The backend is configured to accept requests from the frontend running on `localhost:3000`. For production, update CORS settings to allow only your production domain.

5. **Environment Variables**: The `.env` files are not committed to version control. Make sure to create them locally with the appropriate values.

## 🚀 Production Deployment

### Backend
1. Build the TypeScript code: `npm run build`
2. Set production environment variables
3. Deploy to a service like Heroku, Railway, or AWS
4. Update MongoDB Atlas IP whitelist to include your server IP

### Frontend
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder to a static hosting service (Vercel, Netlify, etc.)
3. Update the `VITE_API_URL` environment variable to point to your production backend

## 📦 Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Zod
- dotenv

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Zustand
- React Query (TanStack Query)
- React Hook Form
- Zod
- Axios

## 📄 License

This project is created for assignment purposes.

## 👤 Author

Created as part of a full-stack development assignment.

## 🎥 Demo Video

A demo video showing all features is available. Please refer to the Google Drive link provided in the submission.

---

**Note**: Make sure both the backend and frontend servers are running simultaneously for the application to work properly. The frontend communicates with the backend API running on `http://localhost:5000`.


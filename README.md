# Todo List Application – Full Stack Assignment

This is a full-stack Todo application built using **React + TypeScript** on the frontend and **Node.js + Express + MongoDB** on the backend. It includes user authentication, full CRUD support for todos, and a simple, responsive UI.

---

## 🚀 Features

### User Authentication
- User Signup  
- User Login  
- Forgot & Reset Password  
- JWT-based authentication

### Todo Operations
- Create Todo  
- Update Todo  
- View/List Todos  
- Delete Todo  
- Mark as completed or not completed  

### Backend Features
- Fully written in TypeScript  
- Proper error handling  
- All backend errors stored in a separate MongoDB collection  
- MongoDB Atlas integration  

### Frontend Features
- React Router for routing  
- Zustand for global state  
- React Query + Zod for API handling and validation  
- React Hook Form for form management  
- Responsive and clean UI  
- TypeScript-only implementation  

---

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js (v18+)  
- npm or yarn  
- A MongoDB Atlas account  

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "fully functional Todo List application"
````

---

## ⚙️ Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## 💻 Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

(Optional) Add a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
fully functional Todo List application/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🔌 API Endpoints

### Authentication

* `POST /api/auth/signup`
* `POST /api/auth/signin`
* `POST /api/auth/forgot-password`
* `POST /api/auth/reset-password`

### Todo (Protected)

* `GET /api/todos`
* `GET /api/todos/:id`
* `POST /api/todos`
* `PUT /api/todos/:id`
* `DELETE /api/todos/:id`
* `PATCH /api/todos/:id/toggle`

Authorization header format:

```
Authorization: Bearer <token>
```

---

## 🗄️ Database Schema

### User

* name
* email
* password (hashed)
* reset password fields
* timestamps

### Todo

* title
* description
* completed
* userId
* timestamps

### ErrorLog

* message
* stack
* route/method
* userId
* timestamp

---

## 🔐 Authentication Flow

1. User signs in/signs up
2. Backend generates JWT
3. Frontend stores token with Zustand (persistent)
4. All protected APIs include token
5. Backend verifies token in middleware

---

## 🎨 UI & UX

* Simple and clean interface
* Fully responsive
* Real-time validation using Zod
* Proper loading and error feedback
* Protected routes

---

## 🧪 Testing the App

* Sign up
* Log in
* Add a todo
* Edit a todo
* Mark as complete/incomplete
* Delete a todo
* Test forgot/reset password

---

## 📦 Tech Stack

### Backend

* Node.js
* Express
* TypeScript
* MongoDB + Mongoose
* JWT
* bcrypt
* Zod

### Frontend

* React
* TypeScript
* Vite
* React Router
* Zustand
* React Query
* React Hook Form
* Axios

---

## 📄 License

This project was created for assignment purposes.

---

## 👤 Author

Developed as part of a full-stack development assignment.

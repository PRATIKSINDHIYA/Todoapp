# Quick Start Guide

## Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

## Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

## Step 2: Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

## Step 3: Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing the Application

1. Go to http://localhost:3000
2. Click "Sign Up" to create an account
3. After signup, you'll be redirected to the todos page
4. Create, update, and delete todos
5. Test the forgot password flow from the sign-in page

## Notes

- Make sure MongoDB Atlas connection string is correct
- Both servers must be running simultaneously
- The frontend proxies API requests to the backend automatically


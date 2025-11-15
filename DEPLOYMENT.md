# Deployment Guide

## Backend Deployment on Render

### Step 1: Prepare Backend for Render

1. **Update backend/src/index.ts** to use Render's PORT:
   - Render automatically provides PORT environment variable
   - The code already uses `process.env.PORT || 5000`, which is correct

2. **Push code to GitHub** (already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `PRATIKSINDHIYA/Todoapp`
4. Configure the service:
   - **Name**: `todo-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or your preferred plan)

5. **Add Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render uses this, but it's auto-set)
   - `MONGODB_URI` = `mongodb+srv://mydatabase:myrealdatabase@cluster0.nzmws71.mongodb.net/tododb?retryWrites=true&w=majority`
   - `JWT_SECRET` = `N7vlT4mEp8kergLWRDb9HQZS2sVBnYKo` (or your secret)
   - `JWT_EXPIRES_IN` = `7d`

6. Click **"Create Web Service"**
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://todo-backend.onrender.com`)

### Step 3: Update MongoDB Atlas Network Access

1. Go to MongoDB Atlas Dashboard
2. **Network Access** → **Add IP Address**
3. Add `0.0.0.0/0` to allow all IPs (or Render's specific IPs if known)

---

## Frontend Deployment on Vercel

### Step 1: Prepare Frontend

1. **Create `.env.production` file** (optional, or use Vercel environment variables):
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `PRATIKSINDHIYA/Todoapp`
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variables**:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
     (Replace with your actual Render backend URL)

6. Click **"Deploy"**
7. Wait for deployment to complete
8. Your frontend will be live at `https://your-project.vercel.app`

---

## Post-Deployment Checklist

- [ ] Backend is accessible at Render URL
- [ ] Frontend environment variable `VITE_API_URL` points to backend
- [ ] MongoDB Atlas allows connections from Render
- [ ] Test signup/signin on deployed frontend
- [ ] Test creating/updating/deleting todos
- [ ] Verify CORS is working (backend allows frontend domain)

---

## Troubleshooting

### Backend Issues:
- **MongoDB Connection Error**: Check Network Access in MongoDB Atlas
- **Port Error**: Render auto-sets PORT, ensure code uses `process.env.PORT`
- **Build Fails**: Check that all dependencies are in `dependencies` not `devDependencies`

### Frontend Issues:
- **API Calls Fail**: Check `VITE_API_URL` environment variable
- **CORS Error**: Update backend CORS to allow Vercel domain
- **Build Fails**: Check Vite configuration and dependencies

### CORS Configuration:
If you get CORS errors, update `backend/src/index.ts`:
```typescript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```


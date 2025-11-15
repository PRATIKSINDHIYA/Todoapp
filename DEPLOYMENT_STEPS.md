# Quick Deployment Steps

## 🚀 Backend on Render

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **New Web Service** → Connect GitHub repo: `PRATIKSINDHIYA/Todoapp`
3. **Settings**:
   - Name: `todo-backend`
   - Root Directory: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm start`
4. **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://mydatabase:myrealdatabase@cluster0.nzmws71.mongodb.net/tododb?retryWrites=true&w=majority
   JWT_SECRET=N7vlT4mEp8kergLWRDb9HQZS2sVBnYKo
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   ```
5. **Deploy** → Copy backend URL (e.g., `https://todo-backend-xxxx.onrender.com`)

## 🎨 Frontend on Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Add New Project** → Import `PRATIKSINDHIYA/Todoapp`
3. **Settings**:
   - Root Directory: `frontend`
   - Framework: Vite (auto-detected)
4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual Render backend URL)
5. **Deploy** → Your app is live!

## ✅ Final Steps

1. Update MongoDB Atlas Network Access to allow Render IPs
2. Test the deployed application
3. Update README with live URLs


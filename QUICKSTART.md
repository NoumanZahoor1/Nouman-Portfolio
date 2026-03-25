# 🚀 Quick Start Guide

Get your MERN portfolio up and running in minutes!

## Prerequisites Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Git installed

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install root dependencies (concurrently)
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Connection string: `mongodb://localhost:27017/portfolio`

**Option B: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your password

### 3. Configure Environment Variables

Create `server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email (Optional - for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL
CLIENT_URL=http://localhost:5173
```

**Note:** For Gmail, you'll need to generate an [App Password](https://support.google.com/accounts/answer/185833)

### 4. Create Admin User

**Method 1: Using curl**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "SecurePassword123!"
  }'
```

**Method 2: Using Postman**
1. Start the server
2. POST to `http://localhost:5000/api/auth/register`
3. Body (JSON):
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "SecurePassword123!"
}
```

### 5. Run the Application

**From root directory:**
```bash
npm run dev
```

This starts both server (port 5000) and client (port 5173) simultaneously.

**Or run separately:**

Terminal 1 (Server):
```bash
cd server
npm run dev
```

Terminal 2 (Client):
```bash
cd client
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Admin Login:** http://localhost:5173/admin/login

## 🎯 First Steps After Setup

1. **Login to Admin Panel**
   - Go to `/admin/login`
   - Use your admin credentials

2. **Add Your First Project**
   - Navigate to Admin Dashboard → Projects
   - Click "Add Project"
   - Fill in project details

3. **Create a Blog Post**
   - Go to Admin Dashboard → Blogs
   - Add your first blog post

4. **Customize Your Portfolio**
   - Edit `client/src/pages/Home.jsx` - Update hero section
   - Edit `client/src/pages/About.jsx` - Add your bio
   - Edit `client/src/pages/Resume.jsx` - Update experience

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in server/.env
PORT=5001

# Or kill the process using the port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### MongoDB Connection Error
- Check your MongoDB URI in `.env`
- Ensure MongoDB is running (if local)
- Check network access (if Atlas)

### CORS Errors
- Ensure `CLIENT_URL` in server `.env` matches your frontend URL
- Check that server is running on correct port

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do this for both client and server
```

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize colors in `client/tailwind.config.js`
- Add your social media links in `client/src/components/Footer.jsx`
- Deploy to production (see README.md deployment section)

## 💡 Tips

- Use MongoDB Compass to visualize your database
- Check browser console for frontend errors
- Check server terminal for backend errors
- Use Postman to test API endpoints

Happy coding! 🎉

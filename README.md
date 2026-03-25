# 🚀 MERN Portfolio Website

A modern, full-stack portfolio website built with the MERN stack (MongoDB, Express, React, Node.js). This portfolio demonstrates real-world skills including REST APIs, authentication, database management, and modern UI/UX.

## ✨ Features

### Frontend
- ⚡ **Fast & Modern**: Built with React + Vite for optimal performance
- 🎨 **Beautiful UI**: TailwindCSS with dark/light mode toggle
- 🎭 **Animations**: Smooth animations using Framer Motion
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🧭 **Navigation**: Smooth scrolling and intuitive navigation

### Pages
1. **Home** - Hero section with typing effect, tech stack badges, and stats
2. **About** - Bio, skills timeline, and experience
3. **Projects** - Interactive project showcase with filtering and modals
4. **Skills** - Visual skill charts and progress bars
5. **Blog** - Markdown blog with syntax highlighting
6. **Resume** - Professional resume with timeline UI
7. **Contact** - Contact form with email integration
8. **Admin Dashboard** - Protected admin panel for content management

### Backend
- 🔐 **Authentication**: JWT-based authentication system
- 📊 **REST APIs**: Full CRUD operations for projects, blogs, and messages
- 💾 **Database**: MongoDB with Mongoose ODM
- 📧 **Email**: Nodemailer integration for contact form
- 🛡️ **Security**: Protected routes and middleware

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer
- Bcrypt

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Step 1: Clone the repository
```bash
git clone <your-repo-url>
cd mern-portfolio
```

### Step 2: Install dependencies

Install root dependencies:
```bash
npm install
```

Install server dependencies:
```bash
cd server
npm install
```

Install client dependencies:
```bash
cd ../client
npm install
```

### Step 3: Environment Setup

Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary (optional, for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in the `client` directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Run the application

**Option 1: Run both server and client together**
```bash
npm run dev
```

**Option 2: Run separately**

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

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 👤 Admin Setup

### Create Admin User

You can create an admin user by making a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "your_secure_password"
  }'
```

Or use a tool like Postman to register the first admin user.

Then login at `/admin/login` to access the admin dashboard.

## 📁 Project Structure

```
mern-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Theme, Auth)
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   ├── public/
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point
│   └── package.json
│
└── package.json           # Root package.json
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client:
```bash
cd client
npm run build
```

2. Deploy the `dist` folder to Vercel or Netlify

### Backend (Render/Railway)
1. Set environment variables in your hosting platform
2. Deploy the `server` folder
3. Update `CLIENT_URL` in backend `.env` to your frontend URL

### Database
- Use MongoDB Atlas for cloud database
- Update `MONGODB_URI` in your backend `.env`

## 📝 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/slug/:slug` - Get blog by slug
- `POST /api/blogs` - Create blog (Admin)
- `PUT /api/blogs/:id` - Update blog (Admin)
- `DELETE /api/blogs/:id` - Delete blog (Admin)

### Messages
- `GET /api/messages` - Get all messages (Admin)
- `POST /api/messages` - Create message (Contact form)
- `PUT /api/messages/:id/read` - Mark as read (Admin)
- `DELETE /api/messages/:id` - Delete message (Admin)

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

## 🎨 Customization

### Update Personal Information
1. Edit `client/src/pages/Home.jsx` - Update hero section
2. Edit `client/src/pages/About.jsx` - Update bio and experience
3. Edit `client/src/pages/Resume.jsx` - Update resume details
4. Edit `client/src/components/Footer.jsx` - Update social links

### Styling
- Colors: Edit `client/tailwind.config.js`
- Global styles: Edit `client/src/index.css`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Framer Motion for smooth animations
- All the open-source contributors

## 📧 Contact

For questions or support, please open an issue or contact through the portfolio contact form.

---

Built with ❤️ using the MERN stack

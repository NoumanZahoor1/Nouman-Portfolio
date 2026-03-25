import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

// Layout
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import BlogPost from './pages/BlogPost'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Main Public Routes featuring Single-Page Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App

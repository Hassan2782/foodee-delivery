import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import AdminRegister from './components/AdminRegister'
import AdminLogin from './components/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'
import OrderHistory from './components/OrderHistory'

function App() {
  return (
    <div>
      <nav style={{ maxWidth: 400, margin: '20px auto', display: 'flex', gap: 16 }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/orders">Order History</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App

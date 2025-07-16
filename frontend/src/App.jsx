import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import './components/navbar/Navbar.css';
import Footer from './components/footer/footer';
import './components/footer/footer.css';
import LoginPage from './components/login/LoginPage';
import Home from './pages/home/home';
import './pages/home/home.css';
import Cart from './pages/cart/cart';
import './pages/cart/cart.css';
import PlaceOrder from './pages/placeorder/placeorder';
import './pages/placeorder/placeorder.css';

const AdminDashboard = () => <div style={{padding:40}}><h2>Admin Dashboard</h2><p>Welcome, admin!</p></div>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const role = localStorage.getItem('role');

  // Listen for login/logout changes
  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!isLoggedIn) {
    // Pass setIsLoggedIn to LoginPage so it can update state after login
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ 
      width: '80%', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '0 20px' 
    }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/admin-dashboard" element={
          role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

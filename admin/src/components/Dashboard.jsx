import React from 'react';
import { useNavigate } from 'react-router-dom';
import FoodManagement from './FoodManagement';

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };
  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} style={{ marginBottom: 20, padding: 10, width: 120 }}>Logout</button>
      <FoodManagement />
    </div>
  );
}

export default Dashboard; 
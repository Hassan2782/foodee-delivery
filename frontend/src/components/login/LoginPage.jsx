import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../../config/api';

const LoginPage = ({ onLogin }) => {
  const [tab, setTab] = useState('user');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (tab === 'user') {
      try {
        const res = await fetch(API_ENDPOINTS.USER_LOGIN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password })
        });
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role || 'user');
          if (onLogin) onLogin(); // Update parent component state
          navigate('/home');
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        setError('Server error');
      }
      setLoading(false);
    } else if (tab === 'admin' && form.email === 'admin@example.com' && form.password === 'admin') {
      window.open('http://localhost:5174/login', '_blank');
      setLoading(false);
    } else {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (form.email && form.password && form.name) {
      try {
        const res = await fetch(API_ENDPOINTS.USER_REGISTER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
        });
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role || 'user');
          if (onLogin) onLogin(); // Update parent component state
          navigate('/');
        } else {
          setError(data.message || 'Registration failed');
        }
      } catch (err) {
        setError('Server error');
      }
    } else {
      setError('Please fill all fields');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px #0002', transition: 'box-shadow 0.2s', minHeight: 420 }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32, gap: 4 }}>
        <button onClick={() => setTab('user')} style={{ flex: 1, padding: 12, background: tab === 'user' ? '#ffe5e0' : '#f7f7f7', border: 'none', borderRadius: 8, fontWeight: 500, color: tab === 'user' ? 'tomato' : '#333', cursor: 'pointer', transition: 'background 0.2s' }}>User Login</button>
        <button onClick={() => setTab('admin')} style={{ flex: 1, padding: 12, background: tab === 'admin' ? '#ffe5e0' : '#f7f7f7', border: 'none', borderRadius: 8, fontWeight: 500, color: tab === 'admin' ? 'tomato' : '#333', cursor: 'pointer', transition: 'background 0.2s' }}>Admin Login</button>
        <button onClick={() => setTab('register')} style={{ flex: 1, padding: 12, background: tab === 'register' ? '#ffe5e0' : '#f7f7f7', border: 'none', borderRadius: 8, fontWeight: 500, color: tab === 'register' ? 'tomato' : '#333', cursor: 'pointer', transition: 'background 0.2s' }}>Register</button>
      </div>
      {tab === 'user' || tab === 'admin' ? (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} autoComplete="on">
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', outline: 'none', fontSize: 16, marginBottom: 0, boxSizing: 'border-box', transition: 'border 0.2s' }} onFocus={e => e.target.style.border = '1.5px solid tomato'} onBlur={e => e.target.style.border = '1px solid #ddd'} required autoComplete="username" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', outline: 'none', fontSize: 16, marginBottom: 0, boxSizing: 'border-box', transition: 'border 0.2s' }} onFocus={e => e.target.style.border = '1.5px solid tomato'} onBlur={e => e.target.style.border = '1px solid #ddd'} required autoComplete="current-password" />
          <button type="submit" style={{ width: '100%', padding: 12, background: 'tomato', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, marginTop: 8, boxShadow: '0 2px 8px #0001', cursor: 'pointer', transition: 'background 0.2s' }} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} autoComplete="on">
          <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', outline: 'none', fontSize: 16, marginBottom: 0, boxSizing: 'border-box', transition: 'border 0.2s' }} onFocus={e => e.target.style.border = '1.5px solid tomato'} onBlur={e => e.target.style.border = '1px solid #ddd'} required autoComplete="name" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', outline: 'none', fontSize: 16, marginBottom: 0, boxSizing: 'border-box', transition: 'border 0.2s' }} onFocus={e => e.target.style.border = '1.5px solid tomato'} onBlur={e => e.target.style.border = '1px solid #ddd'} required autoComplete="email" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', outline: 'none', fontSize: 16, marginBottom: 0, boxSizing: 'border-box', transition: 'border 0.2s' }} onFocus={e => e.target.style.border = '1.5px solid tomato'} onBlur={e => e.target.style.border = '1px solid #ddd'} required autoComplete="new-password" />
          <button type="submit" style={{ width: '100%', padding: 12, background: 'tomato', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, marginTop: 8, boxShadow: '0 2px 8px #0001', cursor: 'pointer', transition: 'background 0.2s' }} disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
      )}
      {error && <div style={{ color: 'red', marginTop: 20, textAlign: 'center', fontWeight: 500, fontSize: 15 }}>{error}</div>}
    </div>
  );
};

export default LoginPage; 
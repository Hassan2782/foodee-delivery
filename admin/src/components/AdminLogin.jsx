import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setMessage('Please enter a valid email.');
      return false;
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          setEmail('');
          setPassword('');
          navigate('/dashboard');
        }, 1000);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Admin Login</div>
      <form onSubmit={handleSubmit} className={styles.inputs} autoComplete="off">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" className={styles.input} autoFocus />
        <div style={{ position: 'relative' }}>
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="Password" className={styles.input} />
          <span onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer', fontSize: 12, color: '#888' }}>{showPassword ? 'Hide' : 'Show'}</span>
        </div>
        <button type="submit" disabled={loading} className={styles.button} style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <div className={styles.message} style={{ color: message.includes('success') ? 'green' : 'red', marginTop: 10 }}>{message}</div>}
    </div>
  );
}

export default AdminLogin; 
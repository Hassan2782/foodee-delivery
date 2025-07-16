import React, { useState } from 'react';
import styles from './AdminRegister.module.css';

function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Registration successful!');
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Admin Registration</div>
      <form onSubmit={handleSubmit} className={styles.inputs}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" className={styles.input} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="Password" className={styles.input} />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <div className={styles.message} style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</div>}
    </div>
  );
}

export default AdminRegister; 
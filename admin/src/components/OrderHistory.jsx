import React, { useEffect, useState } from 'react';
import styles from './OrderHistory.module.css';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/admin/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
          setError('');
        } else {
          setError(data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        setError('Server error');
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.title}>Order History</div>
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Order ID</th>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Items</th>
              <th className={styles.th}>Total</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className={styles.td}>{order._id}</td>
                <td className={styles.td}>{order.user}</td>
                <td className={styles.td}>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item.name} x {item.quantity} (${item.price})</li>
                    ))}
                  </ul>
                </td>
                <td className={styles.td}>${order.total}</td>
                <td className={styles.td + ' ' + styles.status}>{order.status}</td>
                <td className={styles.td}>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default OrderHistory; 
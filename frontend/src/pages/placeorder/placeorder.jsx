import React, { useContext, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/store-context';

function PlaceOrder() {
  const { cartitemIds, food_list, getTotalCartAmount, setCartitemIds } = useContext(StoreContext);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '', country: '', phone: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.placeholder.replace(/\s/g, '').toLowerCase()]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // Prepare order data
    const items = Object.keys(cartitemIds).map(id => {
      const food = food_list.find(f => f._id === id);
      return {
        foodId: id,
        name: food.name,
        price: food.price,
        quantity: cartitemIds[id]
      };
    });
    const user = form.email || 'guest';
    const total = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2);
    try {
      const res = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, items, total })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Order placed successfully!');
        setCartitemIds({});
      } else {
        setMessage(data.message || 'Order failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
    setLoading(false);
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multiple-fields">
          <input type="text" placeholder='First Name' value={form.firstName} onChange={handleChange} />
          <input type="text" placeholder='Last Name' value={form.lastName} onChange={handleChange} />
        </div>
        <input type="email" placeholder='Email Address' value={form.email} onChange={handleChange} />
        <input type="text" placeholder='street address' value={form.address} onChange={handleChange} />
        <div className="multiple-fields">
          <input type="text" placeholder='City' value={form.city} onChange={handleChange} />
          <input type="text" placeholder='State' value={form.state} onChange={handleChange} />
        </div>
        <div className="multiple-fields">
          <input type="number" placeholder='Zip Code' value={form.zip} onChange={handleChange} />
          <input type="text" placeholder='Country' value={form.country} onChange={handleChange} />
        </div>
        <input type="number" placeholder='Phone' value={form.phone} onChange={handleChange} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Placing Order...' : 'PROCEED TO PAYMENT'}</button>
          {message && <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: 10 }}>{message}</div>}
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;

import React, { useEffect, useState } from 'react';
import styles from './FoodManagement.module.css';

// List of available images from frontend assets
const foodImages = Array.from({ length: 32 }, (_, i) => `food_${i + 1}.png`);
const categories = [
  'Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'
];

function FoodManagement() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: foodImages[0],
    category: categories[0]
  });
  const [addMsg, setAddMsg] = useState('');
  const [editId, setEditId] = useState(null);
  const [editMsg, setEditMsg] = useState('');

  // Fetch all food items
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/food/list');
      const data = await res.json();
      setFoods(data.data || []);
      
      setError('');
    } catch (err) {
      setError('Failed to fetch food items');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle add food
  const handleAddFood = async e => {
    e.preventDefault();
    setAddMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setAddMsg('Food added successfully!');
        setForm({ name: '', price: '', description: '', image: foodImages[0], category: categories[0] });
        fetchFoods();
      } else {
        setAddMsg(data.message || 'Failed to add food');
      }
    } catch (err) {
      setAddMsg('Server error');
    }
  };

  // Handle delete food
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/food/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchFoods();
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  // Handle edit food (fill form)
  const handleEdit = (food) => {
    setEditId(food._id);
    setForm({
      name: food.name,
      price: food.price,
      description: food.description,
      image: food.image,
      category: food.category
    });
    setEditMsg('');
  };

  // Handle save edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setEditMsg('');
    try {
      const res = await fetch(`http://localhost:5000/api/food/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setEditMsg('Food updated successfully!');
        setEditId(null);
        setForm({ name: '', price: '', description: '', image: foodImages[0], category: categories[0] });
        fetchFoods();
      } else {
        setEditMsg(data.message || 'Failed to update food');
      }
    } catch (err) {
      setEditMsg('Server error');
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ name: '', price: '', description: '', image: foodImages[0], category: categories[0] });
    setEditMsg('');
  };

  return (
    <div>
      {/* Add/Edit Food Section */}
      <section className={styles.section}>
        <div className={styles.title}>{editId ? 'Edit Food Item' : 'Add New Food Item'}</div>
        <form onSubmit={editId ? handleSaveEdit : handleAddFood} className={styles.form}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className={styles.input} />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required className={styles.input} />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required className={styles.input} />
          <select name="image" value={form.image} onChange={handleChange} className={styles.select}>
            {foodImages.map(img => <option key={img} value={img}>{img}</option>)}
          </select>
          <select name="category" value={form.category} onChange={handleChange} className={styles.select}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <button type="submit" className={styles.button}>{editId ? 'Save' : 'Add Food'}</button>
          {editId && <button type="button" onClick={handleCancelEdit} className={styles.button + ' ' + styles.cancel}>Cancel</button>}
        </form>
        {(addMsg || editMsg) && <div className={styles.message} style={{ color: (addMsg+editMsg).includes('success') ? 'green' : 'red' }}>{addMsg || editMsg}</div>}
      </section>
      {/* All Food Items table removed as requested */}
    </div>
  );
}

export default FoodManagement; 
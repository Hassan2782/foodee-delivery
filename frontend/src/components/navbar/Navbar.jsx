import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/store-context'; 

function Navbar() {
    const [menu, setMenu] = useState("menu");
    const { getTotalCartAmount } = useContext(StoreContext); 
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // Dispatch a custom event to notify App component
        window.dispatchEvent(new Event('storage'));
        // Force reload to ensure clean state
        window.location.reload();
    };

    return (
        <div className='navbar'>
            <Link to="/"><h1 className='logo'>Foodee</h1></Link>
            <ul className="navbar-menu">
                <Link to='/home' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
                <a href='#footer' onClick={() => setMenu("Contact-Us")} className={menu === "Contact-Us" ? "active" : ""}>Contact-Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {token && (
                  <button onClick={logout}>Logout</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;

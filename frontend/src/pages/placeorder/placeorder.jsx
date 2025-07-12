import React, { useContext } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/store-context';

function PlaceOrder() {
   const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multiple-fields">
          <input type="text" placeholder='First Name' />
          <input type="text"  placeholder='Last Name'/>
        </div>
        <input type="email" placeholder='Email Address' />
          <input type="text"  placeholder='street address'/>
        <div className="multiple-fields">
          <input type="text" placeholder='City' />
          <input type="text"  placeholder='State'/>
        </div>
        <div className="multiple-fields">
          <input type="number" placeholder='Zip Code' />
          <input type="text"  placeholder='Country'/>
        </div>
            <input type="number"  placeholder='Phone'/>
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
                    <p>${getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Total</p>
                    <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
                </div>
            </div>
            <button >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

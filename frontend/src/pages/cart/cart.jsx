import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/store-context'

function Cart() {
  const { cartitemIds, food_list, removeFromCart } = useContext(StoreContext)
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list
         .filter(item => item && cartitemIds[item._id] > 0)
         .map(item => (
     <div key={item._id} className="cart-items-title cart-items-item">
      <img src={item.image} alt={item.name} />
      <p>{item.name}</p>
      <p>${item.price}</p>
      <p>{cartitemIds[item._id]}</p>
      <p>${item.price * cartitemIds[item._id]}</p>
      <p className='cross'
        onClick={() => removeFromCart(item._id)}
      >
        x
      </p>
     </div>
      ))}


      </div>
      <div className="cart-bottom">
        <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
                <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>{0}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>{2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Total</p>
                    <p>{0}</p>
                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
            <div>
                <p>If you have a promr code ,Enter it here </p>
                <div className="cart-promocode-input">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

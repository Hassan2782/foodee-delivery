import React, { useContext } from 'react'
import './food-display.css'
import { StoreContext } from '../../context/store-context'
import FoodItem from '../food-item/FoodItem'

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext)

  return (
    <div>
      <div className="food-display" id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {food_list
            .filter(item => category === "All" || item.category === category)
            .map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default FoodDisplay

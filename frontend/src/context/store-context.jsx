import React, { createContext, useState, useContext, useEffect } from 'react';
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (Props) => {
  const [cartitemIds, setCartitemIds] = useState({});

  const addToCart = (itemId) => {
    if (!cartitemIds[itemId]) {
      setCartitemIds((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartitemIds((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartitemIds((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

 const getTotalCartAmount=()=>{
  let totalAmount=0;
  for(const item in cartitemIds){
    if(cartitemIds[item]>0){
    let iteminfo=food_list.find((product)=>product._id===item);
    totalAmount+=iteminfo.price*cartitemIds[item];
    }
  }
  return totalAmount;
 }

  const contextValue = {
    food_list,
    cartitemIds,
    setCartitemIds,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {Props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

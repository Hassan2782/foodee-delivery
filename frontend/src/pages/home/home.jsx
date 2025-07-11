import React, { useState } from 'react'
import './home.css'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/explore-menu/explore-menu'
import FoodDisplay from '../../components/food-display/Food-Display';
import AppDownload from '../../components/app-download/AppDownload';

function Home() {
    const [category,setCategory]= useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  )
}

export default Home

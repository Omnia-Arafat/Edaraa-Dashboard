import React from 'react'
import "../../styles/home.css"
import myImage from '../../uploaded/images/home-imge.png';
const home = () => {
  return (
    <div>
      <div id='home'>
    <h1 id='h1'>Welcome to our , </h1>
    <h2 id='h2'>Edara Dashboard</h2>
      <img id='home-img' src={myImage} alt='hjjiuh'/>
      </div>
    </div>
  )
}

export default home

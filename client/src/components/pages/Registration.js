
import React from 'react';
import"../../styles/Registration.css";

const Registration = () => {
  return (
    <div>
    <div class="container">
    <div class="main-content">

    <input type="number" id="name" placeholder="Please Enter Your phone" />
    <input type="number" id="phone" placeholder="Please Enter Your phone" />

      <input type="email" id="email" placeholder="Please Enter Your Email" />
      <input
        type="password"
        id="password"
        placeholder="Please Enter Your password"
      />

      
     <button id='reg-in-btn'> Register</button>
    </div>
  </div>
    </div>
  )
}

export default Registration






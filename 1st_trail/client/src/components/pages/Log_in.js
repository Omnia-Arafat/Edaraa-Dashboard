
import React from 'react';
import"../../styles/log_in.css";

const log_in = () => {
  return (
    <div>
    <div class="container">
    <h1 id="welcome-text">Welcome , Omnia</h1>
    <div class="main-content">
      <input type="email" id="email" placeholder="Please Enter Your Email" />
      <input
        type="password"
        id="password"
        placeholder="Please Enter Your password"
      />
     <button id='log-in-btn'> Log in</button>
    </div>
  </div>
    </div>
  )
}

export default log_in






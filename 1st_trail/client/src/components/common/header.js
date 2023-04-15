import React from 'react'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../../styles/Header.css'

const header = () => {
  return (
    <div>
    <div id='header'>
    <div id='rectangle-nav-one'>
    </div>
    <ul id='nav-list'>
    <li> <NavLink exact to="/home" className={({ isActive }) => (isActive ? "active" : "navLink")}>Home</NavLink>
    </li>
    <li><NavLink to="/Warehouse" className={({ isActive }) => (isActive ? "active" : "navLink")}>Warehouse</NavLink></li>
    <li><NavLink to="/Request" className={({ isActive }) => (isActive ? "active" : "navLink")}>Request</NavLink></li>
    <li><NavLink to="/Log-Out" className={({ isActive }) => (isActive ? "active" : "navLink")}>Log Out</NavLink></li>
    
    </ul>
    </div>
    <br ></br>



    </div>
  )
}

export default header

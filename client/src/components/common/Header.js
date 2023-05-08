 import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../../styles/Header.css";

const header = () => {
  return (
  
      <div id="header">
        <div id="rectangle-nav-one"></div>
        <ul id="nav-list">
          <li>
            {" "}
            <NavLink
              exact
              to="/home"
              className={({ isActive }) => (isActive ? "active" : "navLink")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/warehouse_list"
              className={({ isActive }) => (isActive ? "active" : "navLink")}
            >
             Manage Warehouse
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Warehouse_info"
              className={({ isActive }) => (isActive ? "active" : "navLink")}
            >
              Warehouse
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Request"
              className={({ isActive }) => (isActive ? "active" : "navLink")}
            >
              Request
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/Mange_supervisor"
              className={({ isActive }) => (isActive ? "active" : "navLink")}
            >
              Manage Supervisor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="http://localhost:3000/"
              className={({ isActive }) => (isActive ? "active" : "navLink")}
            >
              Log in
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Registration"
              className={({ isActive }) => (isActive ? "active" : "navLink")}
            >
             Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Log-Out"
              className={({ isActive }) => (isActive ? "active" : "navLink")}
            >
              Log Out
            </NavLink>
          </li>
        </ul>
        <br></br>
      </div>
      
   
  );
};

export default header;

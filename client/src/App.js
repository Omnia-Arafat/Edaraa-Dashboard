// ===================importing libraries===================
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactSwitch from 'react-switch';
import { BrowserRouter as Router, Routes, Route, Outlet,Link } from "react-router-dom";
// ======================importing components and pages========
import Log_in from './components/pages/Log_in'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function App() {


  const [theme, setTheme] = useState("light");

    const handleClick = () => {
      const body = document.querySelector('body');
      body.classList.toggle('light');
      body.classList.toggle('dark');

      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

  const [title, setTitle] = useState('Edaraa');

  useEffect(() => {
    document.title = title;
  }, [title]);



  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        console.log('Users:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className={theme} id='app-div'>

    
    <div id='dark_mode_button'>
      <ReactSwitch       onChange={handleClick} checked={theme==='dark'}/>
      <div className='label'>

      {theme === "light" ? "Dark Mode" : "Light Mode"}

      </div>

  </div>
<Header/>
<Outlet/>
<Footer/>

</div>
  );
}
  

// *************************************test*************************

axios.get('/api')
  .then(response => {
    // Handle the response data
    const data = response.data;
    console.log('Data received:', data);
    // Do something with the data, such as displaying it in the frontend
  })
  .catch(error => {
    // Handle any errors
    console.error('Error fetching data:', error);
  });




  
export default App;

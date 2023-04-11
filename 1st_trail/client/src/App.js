
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Log_in from './components/pages/Log_in'
import Header from './components/common/Header'

function App() {
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
    <div>

<Header/>

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

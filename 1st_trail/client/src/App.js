
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

const express = require("express")
const app =express();
const mysql = require("mysql");

const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

//connect to the database

const db = mysql.createConnection({

host: 'localhost',
user: 'root',
password: 'root123',
port:"3306",
database:"cruddatabase"

 });

db.connect((err)=>{

if (err) {
console.error("connection error"); return;
}


console.log("Connected to mysql");

});

module.exports = db;


// execute the INSERT query
db.query("INSERT INTO user (usertype, Email, password,phone,state) VALUES ('admin', 'Esraa shapan.a@gmail.com', 'mypassword','01111111','0');", (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query executed successfully');
  });
  
  // close the connection to the database
  db.end();


  app.use(express.static(path.join(__dirname, 'build')));

  

  // Your API routes go here
  
  app.get('/api/users', function(req, res) {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
    console.log('Sending data:', users); // Log the data being sent to the console
    res.json(users);
    
  });
  
   
    
 
app.listen("5000",()=>{

console.log("run in port 5000")

})
//============== import the database =============================

const mysql = require ("mysql");

//============== connect to the database =============================

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    port:"3306",
    database:"cruddatabase"
    
     });
    
    connection.connect((err)=>{
    
    if (err) {
    console.error("connection error"); return;
    }
    
    
    console.log("Connected to mysql");
    
    });
    
    module.exports = connection;
    
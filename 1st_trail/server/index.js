// =================== INITIALIZE EXPRESS APP ========================

const express = require("express");
const app = express();

// =================== GLOBAL MIDDLEWARE ========================

const db = require("../server/DB/DbConnection");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// execute the INSERT query
db.query( 
  "INSERT INTO user (usertype, Email, password,phone,state) VALUES ('admin', 'Esraa shapan.a@gmail.com', 'mypassword','01111111','0');",
  (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Query executed successfully");
  }
);

// close the connection to the database
db.end();

app.use(express.static(path.join(__dirname, "build")));

// Your API routes go here

app.get("/api/users", function (req, res) {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  console.log("Sending data:", users); // Log the data being sent to the console
  res.json(users);
});

// =================== RUN THE APP ========================

app.listen("5000", () => {
  console.log("run in port 5000");
});

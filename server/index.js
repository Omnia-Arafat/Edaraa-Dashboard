// =================== INITIALIZE EXPRESS APP ========================

const express = require("express");
const app = express();

// =================== GLOBAL MIDDLEWARE ========================

const db = require ("../server/DB/DbConnection");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// execute the INSERT query
/*db.query( 
  "INSERT INTO user (id,name,email,password,token,role,status,phone) VALUES ('4','ayakamal','aya77@gmail.com','12344678','22366448865','0','0','011598555');",
  (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Query executed successfully");
  }
);*/

// close the connection to the database
//db.end();

app.use(express.static(path.join(__dirname, "build")));

// Your API routes go here

app.get("/api/users", function (req, res) {
  const users= [
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

// ====================  Required Module ====================
const auth = require("./routes/auth");
const warehouse = require("./routes/warehouse");



// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use("/auth", auth);
app.use("/warehouse", warehouse);

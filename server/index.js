// =================== GLOBAL MIDDLEWARE ========================
/*const express = require("express");
const app = express();



const db = require ("../server/DB/DbConnection");
const path = require("path");
const morgan = require("morgan");

const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); 

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

//app.use(express.static(path.join(__dirname, "build")));

// Your API routes go here

/*app.get("/api/users", function (req, res) {
  const users= [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  console.log("Sending data:", users); // Log the data being sent to the console
  res.json(users);
});
const admin = require("./middleware/admin");
const supervisor = require("./middleware/supervisor");
// ====================  Required Module ====================
const auth = require("./routes/auth");
const warehouse = require("./routes/warehouse");
const product = require("./routes/product");
const manage_supervisor = require("./routes/manage_supervisor");*/


// ====================  API ROUTES [ ENDPOINTS ]  ====================


/*app.use("/auth", auth);
app.use("/warehouse", warehouse);
app.use("/product", product);
app.use("/manage_supervisor", manage_supervisor);

// =================== RUN THE APP ========================

app.listen("5000", () => {
  console.log("run in port 5000");
});*/

// ==================== INITIALIZE EXPRESS APP ====================
const express = require("express");
const app = express();

// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ====================  Required Module ====================
//const auth = require("./routes/Auth");
//const movies = require("./routes/Movies");
const auth = require("./routes/auth");
const warehouse = require("./routes/warehouse");
const product = require("./routes/product");
const manage_supervisor = require("./routes/manage_supervisor");

// ====================  RUN THE APP  ====================
app.listen(5000, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});

// ====================  API ROUTES [ ENDPOINTS ]  ====================
//app.use("/auth", auth);
//app.use("/movies", movies);

app.use("/auth", auth);
app.use("/warehouse", warehouse);
app.use("/product", product);
app.use("/manage_supervisor", manage_supervisor);
const express = require("express");
const app = express();
const db = require("../server/DB/DbConnection");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
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

app.get('/product', (req, res) => {
  res.send('This is the product page');
});

// app.get('/product', function(req, res) {
//   // Handle the request and send a response
// });

// ====================  Required Module ====================
const auth = require("./routes/auth");
const warehouse = require("./routes/warehouse");
const product = require("./routes/product");
const manage_supervisor = require("./routes/manage_supervisor");

// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use("/auth", auth);
app.use("/warehouse", warehouse);
app.use("/product", product);
app.use("/manage_supervisor", manage_supervisor);

// =================== RUN THE APP ========================
app.listen("5000", () => {
  console.log("run in port 5000");
});
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// The Express app instance should be pointed to the project folder with .html, .css, and .js files.
app.use(express.static(path.join(__dirname, "website")));

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors for cross origin allowance
app.use(cors());

// Setup Server
app.listen(port, () => {
  console.log(`Weather Journal App listening at http://localhost:${port}`);
});

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
  res.json(projectData);
});

// Post Route
app.post("/post-project-data", (req, res) => {
  projectData = { ...req.body };
  res.send(req.body);
});

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://localhost:27017/";
const DATABASE_NAME = "Graduate";

const app = express();
const cors = require('cors');
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/user.routes.js")(app);
require("./app/routes/course.routes.js")(app);
require("./app/routes/gpa.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("Classes");
      console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to team 110 demo application." });
});

app.get("/search/:search_term", (request, res) => {
  console.log("request", request.params.search_term);
  var query = {$or: [{Subject: request.params.search_term}, {Description: { $regex: ".*" + request.params.search_term + ".*"}}, {Name: { $regex: ".*" + request.params.search_term + ".*"}}] };
  collection.find(query).toArray(function(err, result) {
    if(err) {
        return res.status(500).send(err);
    }
    res.status(200)
    res.header("Access-Control-Allow-Origin", "*");
    res.send(result);
  });
});

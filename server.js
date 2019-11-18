const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const dotenv = require("dotenv");

const users = require("./routes/api/users");
const home = require("./routes/api/index")

dotenv.config();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Justine:lim123@cluster0-stbf3.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes

app.use("/api/users", users);
app.use("/", home)

app.use("*",home)

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

// process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

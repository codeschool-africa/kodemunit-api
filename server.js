const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const dotenv = require("dotenv");
app.set("view engine", "ejs");

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
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(`Error: ${err}`));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

//setting templating engine


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

const express = require("express");
const routes = require("./routes");
const db = require("./models");

// Set up port to work with Heroku as well
var PORT = process.env.PORT || 3001;

// Configure express app server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets for production mode (on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Add routes
app.use(routes);

// Sync the database and log a message upon success
db.sequelize.sync({}).then(function () {
    app.listen(PORT, function () {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
});
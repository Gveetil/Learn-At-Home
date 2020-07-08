const { response } = require("express");

// Middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function (req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }

  // If the user isn't logged in, return unauthorized access error
  return response.status(401).json("Unauthorized access.");
};

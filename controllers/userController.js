const db = require("../models");

// User Access Controller 
module.exports = {
  // Returns currently logged in user
  getUser: async function (request, response) {
    return response.status(200).json(request.user);
  },
  // Logout by ending user session
  logout: function (request, response) {
    request.session.destroy();
    request.logout();
    return response.status(200).json({ user: {} });
  }
};

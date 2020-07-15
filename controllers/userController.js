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
    return response.status(200).json({});
  },
  // Returns the Class and Subjects assigned to a user
  getClassSubjects: async function (request, response) {
    try {
      const result = await db.UserClassSubjects.findAll({
        where: {
          UserId: request.user.id,
        }
      });
      return response.json(result);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error.message);
    }
  },
};

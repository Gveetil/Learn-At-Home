const { response } = require("express");

// The currently available user roles in the system
const UserAccessType = {
  Teacher: 1,
  Student: 2
};

// Middleware for restricting routes that only a teacher is allowed to visit 
function isTeacher(req, res, next) {
  if (req.user && req.user.AccessTypeId == UserAccessType.Teacher)
    return next();

  // User is not a teacher - Return unauthorized access error
  return response.status(401).json("Unauthorized access.");
}

// Middleware for restricting routes that only a student is allowed to visit 
function isStudent(req, res, next) {
  if (req.user && req.user.AccessTypeId == UserAccessType.Student)
    return next();

  // User is not a student - Return unauthorized access error
  return response.status(401).json("Unauthorized access.");
}

module.exports = { isTeacher, isStudent };
const router = require("express").Router();
const userRoutes = require("./user");
const teacherRoutes = require("./teacher");
const studentRoutes = require("./student");
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const { isStudent, isTeacher } = require("../../config/middleware/roleValidation");

// User routes
router.use("/user", userRoutes);

// Check user authentication, validate user role is teacher before accessing teacher routes
router.use("/teacher", isAuthenticated, isTeacher, teacherRoutes);

// Check user authentication, validate user role is student before accessing student routes
router.use("/student", isAuthenticated, isStudent, studentRoutes);

module.exports = router;

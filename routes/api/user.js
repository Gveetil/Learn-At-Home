const router = require("express").Router();
const passport = require("../../config/passport");
const userController = require("../../controllers/userController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/user"

// Validate user login via passport local authentication
router.route("/login")
  .post(passport.authenticate("local"), userController.getUser);

// Check user authentication before accessing user details
router.route("/getUser")
  .get(isAuthenticated, userController.getUser);

router.get("/logout", userController.logout);

module.exports = router;

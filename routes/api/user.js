const router = require("express").Router();
const passport = require("../../config/passport");
const userController = require("../../controllers/userController");

// Matches with "/api/user"

// Validate user login via passport local authentication
router.route("/login")
  .post(passport.authenticate("local"), userController.getUser);

// Return current user
router.route("/getUser")
  .get(userController.getUser);

router.get("/logout", userController.logout);

module.exports = router;

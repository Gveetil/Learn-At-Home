const router = require("express").Router();
const userController = require("../../controllers/userController");
const submissionController = require("../../controllers/submissionController");

// Student authorized routes - matches with "/api/student"

router
    .route("/submission")
    .post(submissionController.create);

router
    .route("/tasks/:type")
    .get(submissionController.fetchAllTasks);

router
    .route("/classsubjects")
    .get(userController.getClassSubjects);

module.exports = router;

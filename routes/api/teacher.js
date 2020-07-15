const router = require("express").Router();
const userController = require("../../controllers/userController");
const assignmentController = require("../../controllers/assignmentController");

// Teacher authorized routes - matches with "/api/teacher"

router
    .route("/assignment")
    .post(assignmentController.create)
    .put(assignmentController.update);

router
    .route("/assignments/:type")
    .get(assignmentController.fetchAll);

router
    .route("/assignment/:id")
    .delete(assignmentController.delete);

router
    .route("/classsubjects")
    .get(userController.getClassSubjects);

module.exports = router;

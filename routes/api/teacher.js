const router = require("express").Router();
const teacherController = require("../../controllers/teacherController");
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
    .get(teacherController.getTeacherClassSubjects);

module.exports = router;

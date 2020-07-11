const router = require("express").Router();
const teacherController = require("../../controllers/teacherController");
const assignmentController = require("../../controllers/assignmentController");

// Teacher authorized routes - matches with "/api/teacher"

router
    .route("/assignment")
    .post(assignmentController.create);

router
    .route("/classsubjects")
    .get(teacherController.getTeacherClassSubjects);

module.exports = router;

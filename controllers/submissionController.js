const db = require("../models");

// Submission Controller 
module.exports = {
    // Create a new task submission
    create: async function (request, response) {
        try {
            const { AssignmentId, submissionDate, links } = request.body;
            const newSubmission = {
                AssignmentId,
                submissionDate,
                StudentId: request.user.id,
                SubmissionLinks: getSubmissionLinks(links),
            };
            console.log(newSubmission);
            const result = await db.Submission.create(newSubmission, {
                include: [
                    db.SubmissionLink
                ]
            });
            response.json(result);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error.message);
        }
    },
    // Fetch all submissions and tasks filtered by the request type
    fetchAllTasks: async function (request, response) {
        try {
            const { type: taskType } = request.params;
            const filter = getSubmissionFilter(taskType);
            filter.postedDate = { [db.Sequelize.Op.ne]: null };
            const result = await db.Assignment.findAll({
                where: filter,
                order: [["postedDate", "DESC"]],
                include: [
                    {
                        model: db.StudentAssignments,
                        required: true,
                        on: {
                            AssignmentId: { [db.Sequelize.Op.eq]: db.Sequelize.col('Assignment.id') },
                            StudentId: { [db.Sequelize.Op.eq]: request.user.id },
                        },
                    },
                    db.AssignmentLink,
                    {
                        model: db.Submission,
                        on: {
                            id: { [db.Sequelize.Op.eq]: db.Sequelize.col('StudentAssignments.SubmissionId') },
                        },
                        include: [db.SubmissionLink]
                    },
                ]
            });
            return response.json(result);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error.message);
        }
    },
};

// Fetch list of Submission links based on data sent in
function getSubmissionLinks(links) {
    return links.map(item => ({
        title: item.title,
        link: item.link,
        fileType: item.fileType,
        dropboxFileId: item.dropboxFileId,
        isUploaded: (item.dropboxFileId !== null),
    }));
}

// Returns the filter to fetch tasks based on the type sent in
function getSubmissionFilter(taskType) {
    switch (taskType) {
        case "assignment": {
            return {
                isLearningTask: { [db.Sequelize.Op.eq]: false },
            };
        }
        case "assignment_active": {
            return {
                isLearningTask: { [db.Sequelize.Op.eq]: false },
                '$StudentAssignments.SubmissionId$': { [db.Sequelize.Op.eq]: null },
            };
        } case "assignment_completed": {
            return {
                isLearningTask: { [db.Sequelize.Op.eq]: false },
                '$StudentAssignments.SubmissionId$': { [db.Sequelize.Op.ne]: null },
            };
        } case "task": {
            return {
                isLearningTask: { [db.Sequelize.Op.eq]: true },
            };
        } case "task_active": {
            return {
                isLearningTask: { [db.Sequelize.Op.eq]: true },
                '$StudentAssignments.SubmissionId$': { [db.Sequelize.Op.eq]: null },
            };
        }
        case "task_completed": {
            return {
                isLearningTask: { [db.Sequelize.Op.eq]: true },
                '$StudentAssignments.SubmissionId$': { [db.Sequelize.Op.ne]: null },
            };
        }
        default: {
            // Get all tasks
            return {};
        }
    }
}
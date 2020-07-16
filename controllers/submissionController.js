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
            const filter = getTaskFilter(taskType);
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
                            // Also Filter by current student
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
    // Fetch all ratings 
    fetchAllRatings: async function (request, response) {
        try {
            const result = await db.Rating.findAll({});
            return response.json(result);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error.message);
        }
    },
    // Fetch all student submissions filtered by the request type
    fetchAllSubmissions: async function (request, response) {
        try {
            const { type: submissionType } = request.params;
            const filter = getSubmissionFilter(submissionType);
            const result = await db.StudentAssignments.findAll({
                where: filter,
                order: [[db.Sequelize.col('Assignment.postedDate'), "DESC"]],
                include: [{
                    model: db.Assignment,
                    required: true,
                    on: {
                        id: { [db.Sequelize.Op.eq]: db.Sequelize.col('StudentAssignments.AssignmentId') },
                        // Also Filter by current teacher and filter out learning tasks and drafts
                        postedDate: { [db.Sequelize.Op.ne]: null },
                        isLearningTask: { [db.Sequelize.Op.eq]: false },
                        TeacherId: { [db.Sequelize.Op.eq]: request.user.id },
                    },
                    attributes: ['id', 'title', 'isLearningTask', 'dueDate',
                        'postedDate', 'TeacherId', 'SubjectId'],
                }, {
                    model: db.Submission,
                    on: {
                        id: { [db.Sequelize.Op.eq]: db.Sequelize.col('StudentAssignments.SubmissionId') },
                    },
                    include: [db.SubmissionLink],
                },],
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
function getTaskFilter(taskType) {
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

// Returns the filter to fetch submissions based on the type sent in
function getSubmissionFilter(assignmentType) {
    switch (assignmentType) {
        case "inbox": {
            return {
                "$Submission.markedDate$": { [db.Sequelize.Op.eq]: null },
                "$StudentAssignments.SubmissionId$": { [db.Sequelize.Op.ne]: null },
            };
        }
        case "inprogress": {
            return {
                "$Assignment.dueDate$": { [db.Sequelize.Op.gte]: Date.now() },
                "$StudentAssignments.SubmissionId$": { [db.Sequelize.Op.eq]: null },
            };
        }
        case "overdue": {
            return {
                "$Assignment.dueDate$": { [db.Sequelize.Op.lt]: Date.now() },
                "$StudentAssignments.SubmissionId$": { [db.Sequelize.Op.eq]: null },
            };
        }
        case "marked": {
            return {
                "$Submission.markedDate$": { [db.Sequelize.Op.ne]: null },
                "$StudentAssignments.SubmissionId$": { [db.Sequelize.Op.ne]: null },
            };
        }
        default: {
            // Default: Get all submissions - new and marked
            return {
                "$StudentAssignments.SubmissionId$": { [db.Sequelize.Op.ne]: null },
            };
        }
    }
}
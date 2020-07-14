const db = require("../models");

// Assignment Controller 
module.exports = {
    // Create a new assignment
    create: async function (request, response) {
        try {
            const { title, instructions, isLearningTask,
                dueDate, postedDate, SubjectId, classes, links } = request.body;
            const newAssignment = {
                title, instructions, isLearningTask,
                dueDate, postedDate, SubjectId,
                TeacherId: request.user.id,
                AssignmentClasses: classes.map(item => ({ "ClassId": item.ClassId })),
                AssignmentLinks: getAssignmentLinks(links),
            };
            console.log(newAssignment);
            const result = await db.Assignment.create(newAssignment, {
                include: [
                    db.AssignmentClass, db.AssignmentLink
                ]
            });
            response.json(result);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error.message);
        }
    },
    // Update assignment
    update: async function (request, response) {
        try {
            const result = await db.Assignment.update(request.body, {
                where: {
                    id: request.body.id,
                },
            });
            response.json(result);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error.message);
        }
    },
    // Fetch all assignments filtered by the request type
    fetchAll: async function (request, response) {
        try {
            const { type: assignmentType } = request.params;
            const filter = getAssignmentFilter(assignmentType);
            // Add filter for current user
            filter.TeacherId = { [db.Sequelize.Op.eq]: request.user.id };
            const result = await db.Assignment.findAll({
                where: filter,
                order: [["updatedAt", "DESC"]],
                include: [
                    db.AssignmentClass, db.AssignmentLink, db.AssignmentSubmissions
                ]
            });
            return response.json(result);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error.message);
        }
    },
    delete: async function (request, response) {
        try {
            const { id: assignmentId } = request.params;

            const result = await db.Assignment.destroy({
                where: {
                    id: assignmentId,
                },
                include: [
                    db.AssignmentClass, db.AssignmentLink
                ]
            });
            response.json(result);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error.message);
        }
    }
};

// Fetch list of assignment links based on data sent in
function getAssignmentLinks(links) {
    return links.map(item => ({
        title: item.title,
        link: item.link,
        fileType: item.fileType,
        dropboxFileId: item.dropboxFileId,
        isUploaded: (item.dropboxFileId !== null),
    }));
}

// Returns the filter to fetch assignments based on the type sent in
function getAssignmentFilter(assignmentType) {

    switch (assignmentType) {
        case "draft": {
            return {
                postedDate: { [db.Sequelize.Op.eq]: null },
            };
        }
        case "posted": {
            return {
                postedDate: { [db.Sequelize.Op.ne]: null },
            };
        }
        case "completed": {
            return {
                isLearningTask: { [db.Sequelize.Op.eq]: false },
                "$AssignmentSubmissions.StudentsPending$": { [db.Sequelize.Op.eq]: 0 },
            };
        }
        default: {
            // Get all assignments
            return {};
        }
    }
}
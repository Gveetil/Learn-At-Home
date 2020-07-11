const db = require("../models");

// Assignment Controller 
module.exports = {
    // Create a new assignment
    create: async function (request, response) {
        try {
            console.log(request.user.id);
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
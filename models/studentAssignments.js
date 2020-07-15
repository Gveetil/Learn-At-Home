
// StudentAssignments model
// This model is used to query a view that links students to assignments via classes
// This is a workaround since we don't have classes / mapping tables as part of the system yet   
module.exports = function (sequelize, DataTypes) {
    const StudentAssignments = sequelize.define("StudentAssignments", {
        StudentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    // Avoid table creation for this model since it is a view
    StudentAssignments.sync = () => Promise.resolve();
    // Removing columns not used by this view
    StudentAssignments.removeAttribute('id');
    StudentAssignments.removeAttribute('createdAt');
    StudentAssignments.removeAttribute('updatedAt');

    StudentAssignments.associate = function (models) {
        StudentAssignments.belongsTo(models.Assignment);
    };

    StudentAssignments.associate = function (models) {
        StudentAssignments.belongsTo(models.Submission);
    };

    return StudentAssignments;
};
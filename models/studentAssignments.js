
// StudentAssignments model
// This model is used to query a view that links students to assignments via classes
// This is a workaround since we don't have classes / mapping tables as part of the system yet   
module.exports = function (sequelize, DataTypes) {
    const StudentAssignments = sequelize.define("StudentAssignments", {
        AssignmentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        SubmissionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StudentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        StudentName: DataTypes.STRING,
        ClassName: DataTypes.STRING,
    });

    // Avoid table creation for this model since it is a view
    StudentAssignments.sync = () => Promise.resolve();
    // Removing columns not used by this view
    StudentAssignments.removeAttribute('id');
    StudentAssignments.removeAttribute('createdAt');
    StudentAssignments.removeAttribute('updatedAt');

    StudentAssignments.associate = function (models) {
        StudentAssignments.hasOne(models.Submission, {
            foreignKey: 'AssignmentId',
            otherKey: "SubmissionID",
        });
        StudentAssignments.belongsTo(models.Assignment);
    };


    return StudentAssignments;
};
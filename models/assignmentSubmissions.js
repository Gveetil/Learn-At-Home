
// AssignmentSubmissions model
// This model is used to query a view to find total submissions per assignment  
module.exports = function (sequelize, DataTypes) {
    const AssignmentSubmissions = sequelize.define("AssignmentSubmissions", {
        NotMarked: DataTypes.INTEGER,
        StudentsSubmitted: DataTypes.INTEGER,
        StudentsPending: DataTypes.INTEGER,
    });

    // Avoid table creation for this model since it is a view
    AssignmentSubmissions.sync = () => Promise.resolve();
    // Removing columns not used by this view
    AssignmentSubmissions.removeAttribute('id');
    AssignmentSubmissions.removeAttribute('createdAt');
    AssignmentSubmissions.removeAttribute('updatedAt');

    AssignmentSubmissions.associate = function (models) {
        AssignmentSubmissions.belongsTo(models.Assignment);
    };

    return AssignmentSubmissions;
};

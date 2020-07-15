
// Submission model
module.exports = function (sequelize, DataTypes) {
  const Submission = sequelize.define("Submission", {
    comment: DataTypes.TEXT,
    submissionDate: DataTypes.DATE,
    markedDate: DataTypes.DATE,
    RatingId: DataTypes.INTEGER,
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Associating Submission with Assignment
  Submission.associate = function (models) {
    Submission.belongsTo(models.Assignment, {
      foreignKey: {
        allowNull: false
      }
    });

    // Associating Submission with Links
    Submission.hasMany(models.SubmissionLink);

    // Associating Submission with StudentAssignments view
    Submission.hasOne(models.StudentAssignments);
  };

  return Submission;
};

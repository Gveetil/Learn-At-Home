
// Assignment model
module.exports = function (sequelize, DataTypes) {
  const Assignment = sequelize.define("Assignment", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: DataTypes.TEXT,
    isLearningTask: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    dueDate: DataTypes.DATE,
    postedDate: DataTypes.DATE,
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SubjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Assignment.associate = function (models) {
    // Associating Assignment with Links
    // When an Assignment is deleted, also delete any associated Links
    Assignment.hasMany(models.AssignmentLink, {
      onDelete: "cascade"
    });

    // Associating Assignment with AssignmentClass
    // When an Assignment is deleted, also delete any associated AssignmentClasses
    Assignment.hasMany(models.AssignmentClass, {
      onDelete: "cascade"
    });

    // Associating Assignment with AssignmentSubmissions view
    Assignment.hasMany(models.AssignmentSubmissions);
  };

  return Assignment;
};


// AssignmentClass model
module.exports = function (sequelize, DataTypes) {
  const AssignmentClass = sequelize.define("AssignmentClass", {
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
    {
      tableName: 'AssignmentClass'
    });

  AssignmentClass.associate = function (models) {
    AssignmentClass.belongsTo(models.Assignment, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return AssignmentClass;
};

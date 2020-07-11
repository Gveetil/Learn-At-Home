
// AssignmentLink model
module.exports = function (sequelize, DataTypes) {
  const AssignmentLink = sequelize.define("AssignmentLink", {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    fileType: DataTypes.STRING,
    dropboxFileId: DataTypes.STRING,
    isUploaded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  AssignmentLink.associate = function (models) {
    AssignmentLink.belongsTo(models.Assignment, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return AssignmentLink;
};

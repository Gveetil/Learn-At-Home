
// SubmissionLink model
module.exports = function (sequelize, DataTypes) {
  const SubmissionLink = sequelize.define("SubmissionLink", {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    fileType: DataTypes.STRING,
    dropboxFileId: DataTypes.STRING,
    isUploaded: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  // Associating Submission with Links
  SubmissionLink.associate = function (models) {
    SubmissionLink.belongsTo(models.Submission, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return SubmissionLink;
};

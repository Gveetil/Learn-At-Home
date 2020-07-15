
// UserClassSubjects model
// This model is used to query a view to find all classes / subjects assigned to a
// teacher or student user  
// This is a workaround since we don't have mapping tables for all entities as part of the system yet  
module.exports = function (sequelize, DataTypes) {
  const UserClassSubjects = sequelize.define("UserClassSubjects", {
    ClassId: DataTypes.INTEGER,
    ClassName: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER,
    SubjectName: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
  });

  // Avoid table creation for this model since it is a view
  UserClassSubjects.sync = () => Promise.resolve();
  // Removing columns not used by this view
  UserClassSubjects.removeAttribute('id');
  UserClassSubjects.removeAttribute('createdAt');
  UserClassSubjects.removeAttribute('updatedAt');

  return UserClassSubjects;
};

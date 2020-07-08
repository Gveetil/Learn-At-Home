// Requiring bcrypt for password validation.
const bcrypt = require("bcryptjs");

// user model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    AccessTypeId: DataTypes.INTEGER,
  });

  // validating the password
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};

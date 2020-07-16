
// Rating model
module.exports = function (sequelize, DataTypes) {
  const Rating = sequelize.define("Rating", {
    name: DataTypes.STRING,
  });

  return Rating;
};

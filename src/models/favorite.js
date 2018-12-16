"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {
    description: DataTypes.STRING
  });
  Favorite.associate = function(models) {
    this.belongsTo(models.User, { foreignKey: "FavoriteId", as: "favorite" });
  };
  return Favorite;
};

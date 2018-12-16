"use strict";
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "Token",
    {
      token: DataTypes.STRING,
      expiredAt: DataTypes.DATE,
      used: DataTypes.BOOLEAN
    },
    {}
  );
  Token.associate = function(models) {
    this.belongsTo(models.User);
  };
  return Token;
};

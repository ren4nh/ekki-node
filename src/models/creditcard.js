"use strict";
module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define("CreditCard", {
    cardNumber: DataTypes.BIGINT,
    cardName: DataTypes.STRING,
    securityCode: DataTypes.INTEGER,
    expiredAt: DataTypes.DATE,
    description: DataTypes.STRING
  });
  CreditCard.associate = function(models) {
    this.belongsTo(models.User);
  };
  return CreditCard;
};

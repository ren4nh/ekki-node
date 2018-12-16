"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    amountPayedWithCreditCard: DataTypes.DECIMAL,
    amount: DataTypes.DECIMAL
  });
  Transaction.associate = function(models) {
    this.belongsTo(models.User, {
      foreignKey: "DestinationId",
      as: "destination"
    });
  };
  return Transaction;
};

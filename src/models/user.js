"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      balance: DataTypes.DOUBLE
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, 5);
        },
        beforeUpdate: (user, options) => {
          if (user.changed("password")) {
            user.password = bcrypt.hashSync(user.password, 5);
          }
        }
      }
    }
  );
  User.associate = function(models) {
    this.hasMany(models.Favorite, { as: "favorites" });
    this.hasMany(models.CreditCard, { as: "cards" });
    this.hasMany(models.Transaction, { as: "transactions" });
  };
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  return User;
};

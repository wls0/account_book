"use strict"
module.exports = (sequelize, DataTypes) => {
  const account_user = sequelize.define(
    "account_user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {}
  )
  account_user.associate = function (models) {
    account_user.hasMany(models.account_list)
  }
  return account_user
}

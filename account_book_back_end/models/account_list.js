"use strict"
module.exports = (sequelize, DataTypes) => {
  const account_list = sequelize.define(
    "account_list",
    {
      user_email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      account: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      memo: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  )
  account_list.associate = function (models) {
    account_list.belongsTo(models.account_user, {
      foreignKey: "user_email"
    })
  }
  return account_list
}

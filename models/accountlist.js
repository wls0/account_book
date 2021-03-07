'use strict'
module.exports = (sequelize, DataTypes) => {
  const accountList = sequelize.define('account_lists', {
    userIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bigCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    smallCategory: {
      type: DataTypes.STRING
    },
    card: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {})
  accountList.associate =  (models) => {
    accountList.belongsTo(models.account_lists, {
      foreignKey: "userIndex"
    })
  }
  return accountList
}

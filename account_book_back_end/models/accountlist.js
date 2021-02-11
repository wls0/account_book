'use strict'
module.exports = (sequelize, DataTypes) => {
  const accountList = sequelize.define('accountList', {
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
    },
    memo: {
      type: DataTypes.STRING
    }

  }, {})
  accountList.associate = function (models) {
    // associations can be defined here
  }
  return accountList
}

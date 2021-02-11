'use strict'
module.exports = (sequelize, DataTypes) => {
  const accountUser = sequelize.define('accountUser', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {})
  accountUser.associate = function (models) {
    models.accountUser.hasMany(models.accountList, {
      foreignKey: 'userIndex'
    })
  }
  return accountUser
}

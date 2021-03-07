'use strict'
module.exports = (sequelize, DataTypes) => {
  const accountUser = sequelize.define('account_users', {
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
  accountUser.associate =  (models) => {
    accountUser.hasMany(models.account_lists)
  }
  return accountUser
}

const { sequelize, DataTypes } = require('./index')

const Accounts = sequelize.define(
  'account',
  {
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
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
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    tableName: 'accounts'
  }
)

module.exports = Accounts

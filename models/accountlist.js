const { sequelize, DataTypes } = require('./index')
const { Users } = require('./user')

const Accounts = sequelize.define(
  'account',
  {
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

Accounts.belongsTo(Users, {
  foreignKey: 'userIndex',
  sourceKey: 'id'
})

module.exports = { Accounts }

const { sequelize, DataTypes } = require('./index')
const { Accounts } = require('./accountlist')

const Users = sequelize.define(
  'user',
  {
    index: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id: {
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
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    tableName: 'users'
  }
)

Users.hasOne(Accounts, {
  sourceKey: 'index',
  foreignKey: 'userIndex',
  onDelete: 'CASCADE'
})

module.exports = Users

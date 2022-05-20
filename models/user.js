const { sequelize, DataTypes } = require('./index')
const { Accounts } = require('./accountlist')

const Users = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    tableName: 'users'
  }
)

Users.hasOne(Accounts, {
  sourceKey: 'id',
  foreignKey: 'userIndex',
  onDelete: 'CASCADE'
})

module.exports = Users

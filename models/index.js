const { Sequelize } = require('sequelize')

const name = process.env.DB_NAME
const password = process.env.DB_PASSWORD
const DB = process.env.DB

const config = {
  username: name,
  password,
  database: DB,
  host: 'localhost',
  dialect: 'mysql'
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    username: name,
    password,
    database: DB,
    host: 'localhost',
    dialect: 'mysql'
  }
)

const DataTypes = Sequelize.DataTypes

module.exports = { sequelize, DataTypes }

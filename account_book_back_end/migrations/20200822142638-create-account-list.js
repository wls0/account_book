"use strict"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("account_lists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      memo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("account_lists")
  }
}

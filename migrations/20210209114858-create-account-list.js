'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('account_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userIndex: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bigCategory: {
        type: Sequelize.STRING
      },
      smallCategory: {
        type: Sequelize.STRING
      },
      card: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('account_lists')
  }
}

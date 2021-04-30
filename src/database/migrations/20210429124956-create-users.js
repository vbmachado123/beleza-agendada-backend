'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('users', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          name: Sequelize.STRING,
          phone : Sequelize.STRING,
          email: {
            type: Sequelize.STRING,
            required: true,
            unique: true
          },
          password: {
            type: Sequelize.STRING,
            required: true
          },
          birthday : Sequelize.STRING,
          gender : Sequelize.STRING,
          photourl: Sequelize.STRING,
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          }
      });
    
  },

  down: async (queryInterface, Sequelize) => {
      
      await queryInterface.dropTable('users');
  
  }
};

const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {

    super.init({    
      name: DataTypes.STRING,
      phone : DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        required: true
      },
      birthday : DataTypes.STRING,
      gender : DataTypes.STRING,
      photourl : DataTypes.STRING
    }, {
      sequelize
    })
  }

}

async function connectionTest(connection) {
  try {
      await connection.authenticate()
      console.error('Autenticado com sucesso.')
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
}

module.exports = User;
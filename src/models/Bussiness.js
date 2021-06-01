const { Model, DataTypes } = require('sequelize');

class Bussiness extends Model {
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


module.exports = Bussiness;
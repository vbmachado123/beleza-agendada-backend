const { Model, DataTypes } = require('sequelize');

class Scheduling extends Model {
  static init(sequelize) {

    super.init({    
      date: DataTypes.DATE,
      title : DataTypes.STRING,
      local : DataTypes.STRING,
      address : DataTypes.STRING,
      preco : DataTypes.NUMBER,
      photos : DataTypes.ARRAY,
      user_id : DataTypes.STRING,
      professional_id : DataTypes.STRING,
      rates : DataTypes.ARRAY,
      rateCount : DataTypes.INTEGER,
    }, {
      sequelize
    })
  }

}


module.exports = Scheduling;
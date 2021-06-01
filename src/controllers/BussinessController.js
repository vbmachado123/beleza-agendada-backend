const Bussiness = require('../models/Bussiness');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    const bussiness = await Bussiness.findAll();

    return res.json(bussiness);
  },

  async store(body) {

   const { name, phone , email , password , birthday , gender , photourl } = body;

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt , null );

   try {
      const bussiness = await Bussiness.create({  name, phone , email , password : hash , birthday , gender , photourl  });
      return bussiness;
    } catch (error) {
      console.log('ERRO' , error);
      return error;
    }

  },

  async isValidPassword(bussiness , password) {
    const compare = await bcrypt.compare(password, bussiness.password);
    return compare;
  }
};
const Professional = require('../models/Professional');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    const professionals = await Professional.findAll();

    return res.json(professionals);
  },

  async store(body) {

   const { name, phone , email , password , birthday , gender , photourl } = body;

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt , null );

   try {
      const professionals = await Professional.create({  name, phone , email , password : hash , birthday , gender , photourl  });
      return professionals;
    } catch (error) {
      console.log('ERRO' , error);
      return error;
    }

  },

  async isValidPassword(professionals , password) {
    const compare = await bcrypt.compare(password, professionals.password);
    return compare;
  }
};
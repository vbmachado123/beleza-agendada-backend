const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(body) {

   const { name, phone , email , password , birthday , gender , photourl } = body;

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt , null );

   try {
      const user = await User.create({  name, phone , email , password : hash , birthday , gender , photourl  });
      return user;
    } catch (error) {
      console.log('ERRO' , error);
      return error;
    }

  },

  async isValidPassword(user , password) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }
};
const Sheduling = require('../models/Sheduling');

module.exports = {
  async index(req, res) {
    const shedulings = await Sheduling.findAll();

    return res.json(shedulings);
  },

  async store(body) {

   const { date, title , local , address , preco , photos , user_id , professional_id , rates , rateCount } = body;

   try {
      const shedulings = await Sheduling.create({   date, title , local , address , preco , photos , user_id , professional_id , rates , rateCount  });
      return shedulings;
    } catch (error) {
      console.log('ERRO' , error);
      return error;
    }

  },


};
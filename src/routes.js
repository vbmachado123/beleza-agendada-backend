const express = require('express');

const UserController = require('./controllers/UserController');
const auth = require('./auth/auth');
const routes  = express.Router();
const bodyParser = require('body-parser');

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/signup', auth.signup);
routes.post('/login', auth.login);

routes.get('/', (req, res) =>{
        return res.json({response : 'Beleza agendada'});
});

routes.use(bodyParser.urlencoded({ extended: false }));
module.exports = routes;
const express = require('express');
const routes  = require('./routes');
const passport = require('passport');

require('./database');

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use(routes);
app.listen(3333);
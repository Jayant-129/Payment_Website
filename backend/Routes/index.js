const express = require('express');
const Router = express.Router();
const userRouter = require('./User.js');
const accountRouter = require('./account.js')

Router.use('/user', userRouter);
Router.use('/account',accountRouter)

module.exports = Router;
const express =  require('express');
const Router = express.Router();
const {UserValidSchema, signInValidation,updateSchema} = require('./ValidationSchema');
const {User , Account} = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config.js');
const authMiddleWare = require('./MiddelWare.js');

Router.post('/signup', async (req,res) => {
    const userData = req.body;
    const validateData =  UserValidSchema.safeParse(userData);

    if(!validateData.success){
       return res.status(411).json({message: "Incorrect inputs"});
    }
    const isExist = await User.findOne({
        $or: [{username  : req.body.username},
            {firstName : req.body.firstName},
            {lastName : req.body.lastName},
            {password : req.body.password}
        ]
    });
    if(isExist){
        return res.status(400).json({message: "Email already taken "});
    }
    const user = await User.create({
        username  : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    });
    
    await Account.create({
        userId : user._id,
        balance : Math.floor((Math.random()*10000)) + 1
    });

    const token = jwt.sign({userId : user._id},JWT_SECRET);
    res.status(200).json({
        message: "User created successfully",
        token
    });

});

Router.post('/signin', async (req, res) => {
    const userData = req.body;
    const validateData = signInValidation.safeParse(userData);
    if(!validateData.success){
        return res.status(400).json({message : "Incorrect inputs"});
    }
    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(!user){
        return res.status(411).json({message : "No User Found"});
    }
    const userId = user._id;
    const token = jwt.sign({userId}, JWT_SECRET);
    res.status(200).json({token});
});

Router.put('/', authMiddleWare, async (req, res) => {
    const updateValidation = updateSchema.safeParse(req.body);
    if(!updateValidation.success){
        return res.status(411).json({message: "Error while updating information"});
    }
    await User.updateOne({_id : req.userId}, req.body);
    res.status(200).json({message : "Updated successfully"});
});

Router.get('/bulk', async (req , res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or : [
            {firstName : 
               { $regex: filter}
            }, 
            {lastName : 
                {$regex : filter}
            }
        ]
    });
    const allValidUser = users.map((user) => {
        return ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            userId : user._id
        });
    });
    res.status(200).json({allValidUser});
});
module.exports = Router;
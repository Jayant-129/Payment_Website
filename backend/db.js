const mongoose = require('mongoose');
const { number } = require('zod');

mongoose.connect("mongodb+srv://admin:PupFIrqbS5P71ERG@cluster0.oswlccr.mongodb.net/");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim : true,
        required : true,
        minLength : 3,
        MaxLength : 50,
    },
    firstName : {
        type: String,
        unique: true,
        trim : true,
        required : true,
        maxLength : 50
    },
    lastName : {
        type: String,
        unique: true,
        trim : true,
        required : true,
        maxLength : 50
    },
    password : {
        type: String,
        unique: true,
        trim : true,
        required : true,
        minLength : 6
    },
});

const User = mongoose.model('User', UserSchema);

const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance :{
        type : Number,
        required : true,
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = {
    User,
    Account
};
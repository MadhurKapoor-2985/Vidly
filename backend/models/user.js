const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        trim: true
    },
    email: {
        type:String,
        required:true,
        unique: true,
        minlength:5,
        maxlength:60,
        trim:true
    },
    password: {
        type: String,
        required:true,
        minlength: 5,
        maxlength: 255
    }
});

userSchema.methods.getAuthToken = function() {
    const token = jwt.sign({_id: this._id}, "jwtPrivateKey");
    return token;
}

function validateUser(user) {
    const Schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(60).required(),
        password: Joi.string().min(5).max(255).required()
       
    });

    return Joi.validate(user, Schema);
}

exports.User = mongoose.model('User', userSchema);
exports.validate = validateUser;
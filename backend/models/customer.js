const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const customerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength:3,
        maxlength:10
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateRequest(genre) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
        isGold: Joi.boolean()
    });

    return Joi.validate(genre, schema);
}

exports.Customer = Customer;
exports.validate = validateRequest;

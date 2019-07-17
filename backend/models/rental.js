const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    customer: {
        type: new mongoose.Schema({
            name:{
                type:String,
                minlength:5,
                maxlength:50,
                required:true
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:3,
                maxlength:10
            }
        }),
        required:true
    },
        movie: {
            type: new mongoose.Schema({
                title: {
                    type:String,
                    required: true,
                    minlength:1,
                    maxlength:255,
                    trim:true

                },
                dailyRentalRate:{
                    type:Number,
                    required:true,
                    min:0,
                    max:255
                }
            }),
            required:true
        },
        dateOut: {
            type:Date,
            required:true,
            default:Date.now
        },
        dateReturned: {
            type:Date,
        },
        rentalFee:{
            type:Number,
            min:0
        }
    
});

function validateRental(rental) {
    const schema = Joi.object().keys({
        customerId: Joi.string().required(),
        movieId:    Joi.string().required()
    });

    return Joi.validate(rental, schema);
}

const Rental = mongoose.model('Rental', rentalSchema);

module.exports.Rental = Rental;
module.exports.validate = validateRental;
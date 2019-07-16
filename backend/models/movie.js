const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const {genreSchema} = require('./genre');

const movieSchema = new Schema({
    title: {
        type:String,
        trim: true,
        required: true,
        unique: true,
        minlength: 1,
        maxlength:100
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    }
});

function validateMovie(movie) {
    const Schema = Joi.object().keys({
        title: Joi.string().min(1).max(100).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(1).required()
    });

    return Joi.validate(movie, Schema);
}

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
exports.validate = validateMovie;

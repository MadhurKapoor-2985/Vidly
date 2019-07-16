const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateRequest(genre) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });

    return Joi.validate(genre, schema);


}

exports.Genre = Genre;
exports.validate = validateRequest;
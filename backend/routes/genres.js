const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);



router.get('/', async (req, res) => {
    const genres = await Genre.find({});

    return res.send(genres);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const genre = await Genre.findById(id);

    if (!genre) {
        return res.status(404).send('Genre not found');
    }

    res.json(genre);
});

router.post('/', async (req, res) => {

    const {
        error
    } = validateRequest(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    let genre = new Genre({
        name: req.body.name
    })

    genre = await genre.save();


    res.status(201).send(genre);

});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {
        error
    } = validateRequest(req.body);
    if (error) {
        return res.status(400).send(error);
    }


    const genre = await Genre.findByIdAndUpdate(id, {
        name: req.body.name
    }, {
        new: true
    });

    if (!genre) {
        return res.status(404).send('Genre not found');
    }

    res.status(200).send(genre);

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const genre = await Genre.findByIdAndDelete(id);

    if (!genre) {
        return res.status(404).send('Genre not found');
    }

    res.status(200).send(genre);

});

module.exports = router;


function validateRequest(genre) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });

    return Joi.validate(genre, schema);


}
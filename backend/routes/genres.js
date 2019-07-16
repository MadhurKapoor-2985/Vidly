const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre');

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
    } = validate(req.body);
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
    } = validate(req.body);
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

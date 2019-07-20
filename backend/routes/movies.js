const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const movies = await Movie.find({});

    res.send(movies);
});

router.get('/:id', async(req, res) => {

    const id = req.params.id;
    const movie = await Movie.find(id);

    if(!movie){
        return res.status(404).send('Movie not found');
    }

    res.send(movie);

});

router.post('/', auth, async(req, res) => {

    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    const genre = await Genre.findById(req.body.genreId);

    if(!genre) {
        return res.status(404).send('Genre Not Found');
    }

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);

});

router.put('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    const genre = await Genre.findById(req.body.genreId);

    if(!genre) {
        return res.status(404).send('Genre Not found');
    }


    const movie = await Movie.findByIdAndUpdate(id, {
        title: req.body.title,
        genre:{
            _id:genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate 
    }, {
        new: true
    });

    if (!movie) {
        return res.status(404).send('Movie not found');
    }

    res.status(200).send(movie);

});

router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
        return res.status(404).send('Movie not found');
    }

    res.status(200).send(movie);

});


module.exports = router;
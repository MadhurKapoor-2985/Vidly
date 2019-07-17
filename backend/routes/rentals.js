const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/rental');
const mongoose = require('mongoose');
const {Customer} = require('../models/movie');
const {Movie} = require('../models/movie');
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const movie = await Movie.find(req.body.movieId);
    if(!movie) {
        return res.status(400).send('Invalid Movie');
    }

    const customer = await Customer.find(req.body.customerId);
    if(!customer) {
        return res.status(400).send('Invalid Customer');
    }

    if(movie.numberInStock === 0) {
        return res.status(400).send('Movie not in stock');
    }

    let rental = new Rental({
        customer:{
            _id = customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie:{
            _id = movie._id,
            title = movie.title,
            dailyRentalRate = movie.dailyRentalRate
        }
    });

    try {

        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id = movie._id}, {
            $inc: {numberInStock: -1}
        }).run();


    rental = await rental.save();


    }
    catch(ex) {
        return res.status(500).send('Some error occured');
    }

    res.send(rental);
})
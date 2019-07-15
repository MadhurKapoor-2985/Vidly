const express = require('express');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const router = express.Router();
const Schema = mongoose.Schema;

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

router.get('/', async(req,res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;

    const customer = await Customer.findById(id);

    if (!customer) {
        return res.status(404).send('Customer not found');
    }

    res.json(customer);

});

router.post('/', async(req, res) => {
    const {
        error
    } = validateRequest(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();

    res.send(customer);

});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {
        error
    } = validateRequest(req.body);
    if (error) {
        return res.status(400).send(error);
    }


    const customer = await Customer.findByIdAndUpdate(id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {
        new: true
    });

    if (!customer) {
        return res.status(404).send('Genre not found');
    }

    res.status(200).send(customer);

});

router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
        return res.status(404).send('Genre not found');
    }

    res.send(customer);
});


function validateRequest(genre) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
        isGold: Joi.boolean()
    });

    return Joi.validate(genre, schema);
}

module.exports = router;
const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth');

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

router.post('/', auth, async(req, res) => {
    const {
        error
    } = validate(req.body);
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

router.put('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const {
        error
    } = validate(req.body);
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

router.delete('/:id', auth, async(req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
        return res.status(404).send('Genre not found');
    }

    res.send(customer);
});



module.exports = router;
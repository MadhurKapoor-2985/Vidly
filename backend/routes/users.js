const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) return res.status(400).send('User already exists');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user = await user.save();

    res.send(_.pick(user,[name,email]));
});

module.exports = router;
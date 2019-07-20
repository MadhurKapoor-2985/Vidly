const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    let user = await User.findOne({email: req.body.email});

    if(!user) return res.status(400).send('Invalid Email or password');

    const checkPassword = await bcrypt.compare(req.body.password, user.password);

    if(!checkPassword) return res.status(400).send('Invalid Email or password');

    const token = user.getAuthToken();

    res.send(token);

});

function validate(user) {
    const Schema = Joi.object().keys({
        email: Joi.string().min(5).max(60).required(),
        password: Joi.string().min(5).max(255).required()
       
    });

    return Joi.validate(user, Schema);
}


module.exports = router;
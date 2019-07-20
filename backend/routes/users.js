const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) return res.status(400).send('User already exists');

    user = new User(_.pick(req.body, ['name','email','password']));

    const hash = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, hash);

    user = await user.save();

    res.send(_.pick(user,['name','email','password']));
});

module.exports = router;
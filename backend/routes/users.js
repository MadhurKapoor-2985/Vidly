const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.get('/me', auth, async(req, res) => {
    const id = req.user._id;
    const user = await User.findById(id).select('-password');
    res.send(user);

});

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

    const token = user.getAuthToken();

    res.header('x-auth-token',token).send(_.pick(user,['name','email','_id']));
});

module.exports = router;
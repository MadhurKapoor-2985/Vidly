const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const express = require('express');
const genreRouter = require('./routes/genres');
const customerRouter = require('./routes/customers');


mongoose.connect('mongodb://localhost/Vidly')
    .then(() => console.log('Connected to MongoDB database'))
    .catch((err) => console.log('Error While connecting', err));


const app = express();
app.use(express.json());
app.use('/api/genres/', genreRouter);
app.use('/api/customers', customerRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    return res.send('Welcome to Vidly Homepage');
});



app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});



const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const genreRouter = require('./routes/genres');
const customerRouter = require('./routes/customers');
const movieRouter = require('./routes/movies');
const rentalRouter = require('./routes/rentals');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

mongoose.connect('mongodb://localhost/Vidly')
    .then(() => console.log('Connected to MongoDB database'))
    .catch((err) => console.log('Error While connecting', err));


const app = express();
app.use(express.json());
app.use('/api/genres/', genreRouter);
app.use('/api/customers', customerRouter);
app.use('/api/movies', movieRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    return res.send('Welcome to Vidly Homepage');
});



app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});



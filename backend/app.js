const Joi = require('@hapi/joi');
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let genres = [{
    id: 1,
    name: "Rock"
}, {
    id: 2,
    name: "Jazz"
}];

app.get('/', (req, res) => {
    return res.send('Welcome to Vidly Homepage');
});

app.get('/api/genres', (req, res) => {
    return res.json(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const id = req.params.id;

    const genre = genres.find(x => x.id === parseInt(id));

    if (!genre) {
        return res.status(404).send('Genre not found');
    }

    res.json(genre);
});

app.post('/api/genres', (req, res) => {

    const {
        error
    } = validateRequest(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.status(201).send(genre);

});

app.put('/api/genres/:id', (req, res) => {
    const id = req.params.id;

    const genre = genres.find(x => x.id === parseInt(id));

    if (!genre) {
        return res.status(404).send('Genre not found');
    }
    const {
        error
    } = validateRequest(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    genre.name = req.body.name;
    res.status(200).send(genre);

});

app.delete('/api/genres/:id', (req, res) => {
    const id = req.params.id;

    const genre = genres.find(x => x.id === parseInt(id));

    if (!genre) {
        return res.status(404).send('Genre not found');
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.status(200).send(genre);

});





app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});

function validateRequest(genre) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });

    return Joi.validate(genre, schema);


}
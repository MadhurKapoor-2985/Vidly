const express = require('express');
const router = express.Router();


let genres = [{
    id: 1,
    name: "Rock"
}, {
    id: 2,
    name: "Jazz"
}];

router.get('/', (req, res) => {
    return res.json(genres);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const genre = genres.find(x => x.id === parseInt(id));

    if (!genre) {
        return res.status(404).send('Genre not found');
    }

    res.json(genre);
});

router.post('/', (req, res) => {

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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const genre = genres.find(x => x.id === parseInt(id));

    if (!genre) {
        return res.status(404).send('Genre not found');
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.status(200).send(genre);

});

module.exports = router;



app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});

function validateRequest(genre) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });

    return Joi.validate(genre, schema);


}
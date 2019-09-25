require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const Band = require('./lib/models/bands');

app.use(express.json());

app.get('./api/bands', (req, res, next) => {
  Band.find()
    .then(bands => {
      res.json(bands);
    })
    .catch(next);
});

app.get('./api/bands/:id', (req, res, next) => {
  Band.findById(req.params.id)
    .then(band => {
      res.json(band);
    })
    .catch(next);
});

app.post('./api/bands', (req, res, next) => {
  Band.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));
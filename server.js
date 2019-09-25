require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const Band = require('./lib/models/bands');

app.use(express.json());

app.get('/api/bands', (req, res, next) => {
  Band.find()
    .then(bands => {
      res.json(bands);
    })
    .catch(next);
});

app.get('/api/bands/:id', (req, res, next) => {
  Band.findById(req.params.id)
    .then(band => {
      res.json(band);
    })
    .catch(next);
});

app.post('/api/bands', (req, res, next) => {
  Band.create(req.body)
    .then(newBand => {
      res.json(newBand);
    })
    .catch(next);
});

app.put('/api/bands/:id', (req, res, next) => {
  Band.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updateBand => {
      res.json(updateBand);
    })
    .catch(next);
});

app.delete('/api/bands/:id', (req, res, next) => {
  Band.findByIdAndRemove(req.params.id)
    .then(removeBand => {
      res.json(removeBand);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));
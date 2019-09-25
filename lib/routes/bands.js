/* eslint-disable new-cap */
const router = require('express').Router();
const Band = require('../models/band');

router
  .post('/', (req, res, next) => {
    Band.create(req.body)
      .then(band => res.json(band))
      .catch(next);
  })

  .get('./:id', (req, res, next) => {
    Band.findById(req.params.id)
      .then(band => res.json(band))
      .catch(next);
  })

  .get('./:id', (req, res, next) => {
    Band.find()
      .then(bands => res.json(bands))
      .catch(next);
  })

  .put('./:id', (req, res, next) => {
    Band.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(band => res.json(band))
      .catch(next);
  })

  .delete('./:id', (req, res, next) => {
    Band.findByIdAndRemove(req.params.id)
      .then(band => res.json(band))
      .catch(next);
  });

module.exports = router;
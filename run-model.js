require('dotenv').config();
const connect = require('./lib/connect');
const mongoose = require('mongoose');

connect();

const Band = require('./lib/models/bands');

Band.create({
  name: 'Cult of Luna',
  genre: 'Doom Metal',
  guitarists: 3,
  vocals: ['bellow'],
  synths: false,
  lyrics: {
    form: 'epic narrative',
    language: 'English'
  }
})
  .then(createdBand => {
    console.log(createdBand);
  })
  .then(() => {
    mongoose.disconnect();
  });

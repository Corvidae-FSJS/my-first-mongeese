const mongoose = require('mongoose');
const { Schema } = mongoose;
const schema = new Schema({
  name: {
    type: String, 
    required: true
  },
  genre: {
    type: String, 
    required: true
  },
  guitarists: {
    type: Number,
    required: true,
    min: 0, 
    max: 5
  },
  vocals: [{
    type: String,
    required: true,
    enum: ['none', 'whispers', 'clean', 'yell', 'bellow', 'scream', 'squeal']
  }],
  synths: {
    type: Boolean,
    default: false
  },
  lyrics: {
    form: String,
    language: {
      type: String,
      required: true
    }
  }
});


module.exports = mongoose.model('Bands', schema);
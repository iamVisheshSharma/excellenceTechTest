const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  first_round: {
    type: Number,
    required: true
  },
  second_round: {
    type: Number,
    required: true
  },
  third_round: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('student', studentSchema)
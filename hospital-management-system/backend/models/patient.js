const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  admission: {
    type: String,
    required: true
  },
  medication: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Patient', patientSchema);
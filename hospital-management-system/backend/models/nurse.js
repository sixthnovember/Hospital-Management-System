const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  diploma: {
    type: Boolean,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }  
});

module.exports = mongoose.model('Nurse', nurseSchema);
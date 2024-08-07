const mongoose = require('mongoose');
const importDoctors = require('./imports/importDoctors');
const importNurses = require('./imports/importNurses');
const importPatients = require('./imports/importPatients');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Main function to run all import functions sequentially
const populate = async () => {
  try {
    await importDoctors();
    await importNurses();
    await importPatients();
    mongoose.connection.close();
    console.log('All data imported successfully');
  } catch (error) {
    console.error('Error during data import:', error);
    mongoose.connection.close();
  }
};

populate();
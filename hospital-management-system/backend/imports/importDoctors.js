const fs = require('fs');
const csv = require('csv-parser');
const Doctor = require('../models/doctor');

const importDoctors = () => {
  return new Promise((resolve, reject) => {
    const doctors = [];
    // file taken from: http://www.usmeddata.com/sample/download.php?s1=Doctor
    fs.createReadStream('./data/doctors.csv')
      .pipe(csv())
      .on('data', (row) => {
        const doctor = {
          name: `${row['First Name']} ${row['Last Name']}`,
          specialization: row['Sub Specialty'],
          address: row['Address 1'],
          phone: row['Phone']
        };
        doctors.push(doctor);
      })
      .on('end', () => {
        Doctor.insertMany(doctors)
          .then(() => {
            console.log('Doctors imported successfully');
            resolve();
          })
          .catch((error) => {
            console.error('Error importing doctors:', error);
            reject(error);
          });
      });
  });
};

module.exports = importDoctors;
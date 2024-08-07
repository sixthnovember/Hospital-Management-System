const fs = require('fs');
const csv = require('csv-parser');
const Patient = require('../models/patient');

// Helper function to capitalize the first letter of each word
const capitalize = (str) => {
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

const importPatients = () => {
  return new Promise((resolve, reject) => {
    const patients = [];
    // file taken from: https://www.kaggle.com/datasets/prasad22/healthcare-dataset
    fs.createReadStream('./data/patients.csv')
      .pipe(csv())
      .on('data', (row) => {
        const patient = {
          name: capitalize(row['Name']),
          disease: row['Medical Condition'],
          admission: row['Admission Type'],
          medication: row['Medication']
        };
        patients.push(patient);
      })
      .on('end', () => {
        Patient.insertMany(patients)
          .then(() => {
            console.log('Patients imported successfully');
            resolve();
          })
          .catch((error) => {
            console.error('Error importing patients:', error);
            reject(error);
          });
      });
  });
};

module.exports = importPatients;
const fs = require('fs');
const csv = require('csv-parser');
const Nurse = require('../models/nurse');

const importNurses = () => {
  return new Promise((resolve, reject) => {
    const nurses = [];
    // file taken from: http://www.usmeddata.com/sample/download.php?s1=Nurse
    fs.createReadStream('./data/nurses.csv')
      .pipe(csv())
      .on('data', (row) => {
        const nurse = {
          name: `${row['First Name']} ${row['Last Name']}`,
          diploma: row['Sub Specialty'] === 'Nurse Practitioner',
          address: row['Address 1'],
          phone: row['Phone']
        };
        nurses.push(nurse);
      })
      .on('end', () => {
        Nurse.insertMany(nurses)
          .then(() => {
            console.log('Nurses imported successfully');
            resolve();
          })
          .catch((error) => {
            console.error('Error importing nurses:', error);
            reject(error);
          });
      });
  });
};

module.exports = importNurses;
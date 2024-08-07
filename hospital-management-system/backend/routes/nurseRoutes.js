const express = require('express');
const router = express.Router();
const Nurse = require('../models/nurse');

// Get all nurses
router.get('/', async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.json(nurses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new nurse
router.post('/', async (req, res) => {
  const nurse = new Nurse({
    name: req.body.name,
    diploma: req.body.diploma,
    address: req.body.address,
    phone: req.body.phone
  });
  try {
    const newNurse = await nurse.save();
    res.status(201).json(newNurse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update nurse
router.put('/:id', async (req, res) => {
  try {
    const nurse = await Nurse.findById(req.params.id);
    if (!nurse) {
      return res.status(404).json({ message: 'Nurse not found' });
    }
    nurse.name = req.body.name;
    nurse.diploma = req.body.diploma;
    nurse.address =  req.body.address;
    nurse.phone = req.body.phone;
    const updatedNurse = await nurse.save();
    res.json(updatedNurse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete nurse
router.delete('/:id', async (req, res) => {
  try {
    const nurse = await Nurse.findById(req.params.id);
    if (!nurse) {
      return res.status(404).json({ message: 'Nurse not found' });
    }
    await Nurse.deleteOne({ _id: req.params.id });
    res.json({ message: 'Nurse deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Guest = require('../models/Guest');
const Inmate = require('../models/Inmate');

// Login Route
router.post('/login', async (req, res) => {
  const { facultyId, password } = req.body;
  console.log('Login attempt:', { facultyId }); // Debugging line

  try {
    const user = await User.findOne({ facultyId });
    if (!user || user.password !== password) {
      console.log('Invalid faculty ID or password'); // Debugging line
      return res.status(400).json({ message: 'Invalid faculty ID or password' });
    }

    // Fetch data from all collections specific to the facultyId
    const complaints = await Complaint.find({ facultyId });
    const guests = await Guest.find({ facultyId });
    const inmates = await Inmate.find({ facultyId });

    console.log('Login successful for user:', facultyId); // Debugging line
    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      data: {
        complaints,
        guests,
        inmates,
      }
    });
  } catch (err) {
    console.error('Error during login:', err.message); // Debugging line
    res.status(500).json({ message: err.message });
  }
});

// Create new user (Admin functionality to add users)
router.post('/users', async (req, res) => {
  const { facultyId, password, name, email, phone, quarters, role } = req.body;
  console.log('Creating new user:', { facultyId, name, email }); // Debugging line

  try {
    const newUser = new User({ facultyId, password, name, email, phone, quarters, role });
    
    const savedUser = await newUser.save();
    console.log('User created successfully:', savedUser); // Debugging line
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error creating user:', err.message); // Debugging line
    res.status(400).json({ message: err.message });
  }
});

// Fetch all users
router.get('/users', async (req, res) => {
  console.log('Fetching all users'); // Debugging line
  try {
    const users = await User.find();
    console.log('Users fetched successfully:', users.length); // Debugging line
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message); // Debugging line
    res.status(500).json({ message: err.message });
  }
});

// Fetch inmates by faculty ID
router.get('/inmates', async (req, res) => {
  const { facultyId } = req.query;

  try {
    const inmates = await Inmate.find({ facultyId });
    res.json(inmates);
  } catch (err) {
    console.error('Error fetching inmates:', err.message); // Debugging line
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
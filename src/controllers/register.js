const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../dbConfig'); // Import the database connection details

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Extracting name and mobile from request body
    const { username, password, name, mobile } = req.body;

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserting user data into the database
    await db.execute('INSERT INTO users (username, password, name, mobile) VALUES (?, ?, ?, ?)', [username, hashedPassword, name, mobile]);

    // Sending a successful response
    res.status(201).json({ code: 201, status: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, status: 'Internal Server Error' });
  }
});

module.exports = router;

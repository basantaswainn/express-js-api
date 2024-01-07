const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../dbConfig'); // Import the database connection details

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [req.body.username]);

    if (rows.length === 0) {
      return res.sendStatus(401); // User not found
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.sendStatus(401); // Invalid password
    }

    // Exclude the password field from the user object in the response
    const { password, ...userWithoutPassword } = user;

    const token = jwt.sign({ username: req.body.username }, 'abcdf345', { expiresIn: '1h' });

    // Send the token and user object without the password in the response
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

// utils
const JwtUtil = require('../utils/JwtUtil');

// daos
// const AdminDAO = require('../models/AdminDAO');

// TEMPORARY: Hard-coded login for testing (remove when MongoDB is ready)
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    // Temporary: Accept admin/123 without database
    if (username === 'admin' && password === '123') {
      const token = JwtUtil.genToken(username, password);
      res.json({
        success: true,
        message: 'Authentication successful',
        token: token
      });
    } else {
      res.json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.json({
      success: false,
      message: 'Please input username and password'
    });
  }
});

router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token =
    req.headers['x-access-token'] ||
    req.headers['authorization'];

  res.json({
    success: true,
    message: 'Token is valid',
    token: token
  });
});

module.exports = router;

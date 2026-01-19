const express = require('express');
const router = express.Router();

// utils
const JwtUtil = require('../utils/JwtUtil');

// daos
const CustomerDAO = require('../models/CustomerDAO');

// Login
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const customer = await CustomerDAO.selectByUsernameAndPassword(username, password);
    if (customer) {
      const token = JwtUtil.genToken(customer._id, customer.username);
      res.json({
        success: true,
        message: 'Authentication successful',
        token: token,
        customer: {
          _id: customer._id,
          username: customer.username,
          name: customer.name,
          email: customer.email,
          phone: customer.phone
        }
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

// Verify token
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

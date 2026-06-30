const express = require('express');
const router = express.Router();

const auth = require('./authMiddleware');

router.post('/api/auth/register', (req, res) => {
  // register logic
});

router.post('/api/auth/login', (req, res) => {
  // login logic
});

// Non-auth routes
module.exports = router;
const express = require('express');
const router = express.Router();
const guests = require('../../Guests.json');

router.get('/', function (req, res) {
  res.send(guests);
});

module.exports = router;
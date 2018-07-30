const express = require('express');
const router = express.Router();
const companies = require('../../Companies.json');

router.get('/', function (req, res) {
  res.send(companies);
});

module.exports = router;
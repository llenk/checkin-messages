const express = require('express');
const router = express.Router();
const messages = require('../Messages.json');

router.get('/', function (req, res) {
  res.send(messages);
});

module.exports = router;
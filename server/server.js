const express = require('express');
const bodyParser = require('body-parser');
const guestRouter = require('./routes/guests.router');
const companyRouter = require('./routes/companies.router');
const messageRouter = require('./routes/messages.router');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

// routes
app.use('/guests', guestRouter);
app.use('/companies', companyRouter);
app.use('/messages', messageRouter);
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const api = require('./routes/api')

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));

app.use(express.json());

app.use('/v1',api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;
'use strict';

const express = require('express');
const morgan = require('morgan');
const movies = require('./movies.json');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(helmet());
app.use(morgan());
app.use(cors());

app.use((req, res, next) => {
  const authToken = req.get('Authorization');
  const API_TOKEN = process.env.API_TOKEN;
  if(!authToken || authToken.split(' ')[1] !== API_TOKEN){
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
});

app.get('/movies', (req, res) => {
  let response = movies;
  const { genre, country, avg_vote } = req.query;

  if (genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  if (avg_vote) {
    response = response.filter(movie =>
      Number(movie.avg_vote) >= Number(avg_vote)
    );
  }

  res.send(response);
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});

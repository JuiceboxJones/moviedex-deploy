'use strict';

const express = require('express');
const morgan = require('morgan');
const movies = require('./movies.json');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(helmet());
app.use(morgan());
app.use(cors());

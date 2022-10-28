const express = require('express');
var cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
var path = require('path');

dotenv.config({ path: 'backend/config/config.env' })
app.use('/api/public', express.static(__dirname + '/public'))
require('dotenv').config({ path: 'config/config.env' })



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//Import all routes
const contentRoute = require('./routers/contentRoute');




//API Route Middleware 
app.use('/api/cms/v1/', contentRoute);




module.exports = app;
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

dotenv.config({ path: 'backend/config/config.env' })
require('dotenv').config({ path: 'config/config.env' })

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Import routes...
const postsRoute = require('./routes/postsRoute');


//API Route Middleware 
app.use('/api/', postsRoute);


//connecting to dabase 
connectDatabase();


//server port config...
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`);
})



//Handle unhandle promise rejection
process.on('unhandledRejection', err => {
    // console.log(`Error: ${err.message}`);
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting Down the server due to unhandle promise rejection}`);
    server.close(() => {
        process.exit(1)
    })
})
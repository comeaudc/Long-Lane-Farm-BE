const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');

// Initialise our app variable with express
const app = express();

//Connect Database
connectDB();

//Single endpoint just to test API. Send data to browser
app.get('/', (req, res) => res.send('API Running'))

//Enviromental Variables
const PORT = process.env.PORT || 3001

//Take app variable and LISTENING on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
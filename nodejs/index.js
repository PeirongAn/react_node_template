const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
const app = express();
const routes = require('./routes/routes');
mongoose.connect(mongoString);
const database = mongoose.connection


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());
app.use('/api', routes);
app.listen(8003, () => {
    console.log(`Server Started at ${8003}`)
})
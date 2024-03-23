const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose.connect(dbConfig.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err+ dbConfig.mongoURI));

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

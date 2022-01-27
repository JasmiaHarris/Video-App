const mongoose = require('mongoose');
const config = require('config');

mongoose    
    .connect(
    config.get('mongoURI'),
    {useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`));
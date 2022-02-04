const connectDB = require('./startup/db');
const express = require('express')
const app = express();
const products = require('./route/products')
const videos = require('./route/videos')
const cors = require('cors')


connectDB();
app.use(cors());

app.use(express.json());
app.use('/api/products', products);
app.use('/api/videos', videos);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

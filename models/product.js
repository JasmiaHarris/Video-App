const mongoose = require('mongoose');

// eventually this will change to song, video, playlist, etc:
const productSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 255} ,
    description: {type: String, required: true} ,
    category: {type: String, required: true, minlength: 2, maxlength: 50} ,
    price: {type: Number, required: true} ,
    dateModified: { type: Date, default: Date.now} , 
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product; 


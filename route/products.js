const { Product, validate } = require ('../models/product');
const express = require ('express');
const router = express.Router();

// All endpoints and route handlers go here

router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if ( error )
        return res.status(400).send(error);

        const product = new Product({
            name: 'Stanley Kubrick whatever Vacuum',
            description: 'Young Virginia woman investigates local paranormal sightings',
            category: 'Horror',
            price: '3.99'
        });
        await product.save();

        return res.send(product);
    }
    catch (err) {
    return res.status(500).send(`Internal server error ${err}`);
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        return res.send(products);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
    
})



module.exports = router;

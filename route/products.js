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
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
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
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
    
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(400).send(`The product with ID "${req.params.id}" does not exist.`);
        return res.send(product);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error);

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
            },
            {new: true}
        );
        if (!product) 
            return res.status(400).send(`The product with ID "${req.params.id}" does not exist.`);
        await product.save();
        return res.send(product);
    }   catch (err) {
            return res.status(500).send(`Internal server error "${err}`);
    }
});





// Here are the YouTube routes

router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if ( error )
        return res.status(400).send(error);

        const comment = new Comment({
            part: req.body.part,
            // description: req.body.description,
            // category: req.body.category,
            // price: req.body.price,
        });
        await comment.save();

        return res.send(comment);
        }
        catch (err) {
        return res.status(500).send(`Internal server error ${err}`);
    }
});

module.exports = router;


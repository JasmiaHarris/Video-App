const { Video, validate } = require ('../models/video');
const express = require ('express');
const router = express.Router();

// All endpoints and route handlers go here
// Post for comment

router.post('/:id', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if ( error )
        return res.status(400).send(error);

        const video = new Video(
            req.params.id,
            
            {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            },
            {new: true}
        );
        await video.save();

        return res.send(video);
        }
        catch (err) {
        return res.status(500).send(`Internal server error ${err}`);
    }
});

// post a whole song to the back-end
router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if ( error )
        return res.status(400).send(error);

        const video = new Video({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            });
        await video.save();

        return res.send(video);
        }
        catch (err) {
        return res.status(500).send(`Internal server error ${err}`);
    }
});

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        return res.send(videos);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
    
})

router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video)
            return res.status(400).send(`The video with ID "${req.params.id}" does not exist.`);
        return res.send(video);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

// Likes and dislikes
router.put('/:id', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error);

        const video = await Video.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
            },
            {new: true}
        );
        if (!video) 
            return res.status(400).send(`The video with ID "${req.params.id}" does not exist.`);
        await video.save();
        return res.send(video);
    }   catch (err) {
            return res.status(500).send(`Internal server error "${err}`);
    }
});


module.exports = router;

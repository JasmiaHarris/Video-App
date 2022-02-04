const { Comment, validate } = require ('../models/video');
const express = require ('express');
const { required } = require('joi');
const router = express.Router();

// All endpoints and route handlers go here
// Post for comment

router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if ( error )
        return res.status(400).send(error);

        const comment = new Comment(
            
            {
            videoId: req.body.videoId,
            comment: req.body.comment,
            },
            
        );
        await comment.save();

        return res.send(comment);
        }
        catch (err) {
        return res.status(500).send(`Internal server error ${err}`);
    }
});


router.put('/:id', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if ( error )
        return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
            reply: req.body.reply,
            },
            { new: true }
            
        );
        if (!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
        await comment.save();

        return res.send(comment);
        }
        catch (err) {
        return res.status(500).send(`Internal server error ${err}`);
    }
});

router.put('/:id/likes', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if ( error )
        return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { likes: 1}
            },
            { new: true }
            
        );
        if (!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
        await comment.save();

        return res.send(comment);
        }
        catch (err) {
        return res.status(500).send(`Internal server error ${err}`);
    }
});

router.put('/:id/dislikes', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if ( error )
        return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { dislikes: 1}
            },
            { new: true }
            
        );
        if (!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
        await comment.save();

        return res.send(comment);
        }
        catch (err) {
        return res.status(500).send(`Internal server error ${err}`);
    }
});


// post a whole song to the back-end
// router.post('/', async (req, res) => {
//     try{
//         const { error } = validate(req.body);
//         if ( error )
//         return res.status(400).send(error);

//         const video = new Video({
//             name: req.body.name,
//             description: req.body.description,
//             category: req.body.category,
//             });
//         await video.save();

//         return res.send(video);
//         }
//         catch (err) {
//         return res.status(500).send(`Internal server error ${err}`);
//     }
// });

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.send(comments);
    } catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

// router.get('/:id', async (req, res) => {
//     try {
//         const video = await Video.findById(req.params.id);
//         if (!video)
//             return res.status(400).send(`The video with ID "${req.params.id}" does not exist.`);
//         return res.send(video);
//     } catch (err) {
//         return res.status(500).send(`Internal Server Error: ${err}`);
//     }
// })

// // Likes and dislikes
// router.put('/:id', async (req, res) => {
//     try {
//         const {error} = validate(req.body);
//         if (error) return res.status(400).send(error);

//         const video = await Video.findByIdAndUpdate(
//             req.params.id,
//             {
//                 name: req.body.name,
//                 description: req.body.description,
//                 category: req.body.category,
//             },
//             {new: true}
//         );
//         if (!video) 
//             return res.status(400).send(`The video with ID "${req.params.id}" does not exist.`);
//         await video.save();
//         return res.send(video);
//     }   catch (err) {
//             return res.status(500).send(`Internal server error "${err}`);
//     }
// });


module.exports = router;

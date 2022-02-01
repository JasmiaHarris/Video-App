const mongoose = require('mongoose');
const Joi = require('joi');

const videoSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 255} ,
    description: {type: String, required: true} ,
    category: {type: String, required: true, minlength: 2, maxlength: 50} ,
    ratings: {type: String},
    comment: {type: Array, minlength: 1, maxlength: 1000} ,
    dateModified: { type: Date, default: Date.now} , 
});

const Video = mongoose.model('Video', videoSchema);

function validateVideo(video) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string(),
        category: Joi.string().min(2).max(50).required(),
        ratings: Joi.string(),
        comment: Joi.array().min(1).max(1000),
    });
    return schema.validate(video);
}

exports.Video = Video;
exports.validate = validateVideo;
exports.videoSchema = videoSchema;

const mongoose = require('mongoose');
const Joi = require('joi');
const { date } = require('joi');

const commentSchema = new mongoose.Schema({
    videoId: {type: String} ,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    comment: {type: String, minlength: 1, maxlength: 1000} ,
    reply: {type: String, minlength: 1, maxlength: 1000} ,
    dateModified: {type: Date, default: Date.now} ,
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
    const schema = Joi.object({
        videoId: Joi.string(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        comment: Joi.string().min(1).max(1000),
        reply: Joi.string().min(1).max(1000),
    });
    return schema.validate(comment);
}



exports.Comment = Comment;
exports.validate = validateComment;
exports.commentSchema = commentSchema;

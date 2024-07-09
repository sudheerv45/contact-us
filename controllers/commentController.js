const Comment = require('../models/commentModel');

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createComment = async (req, res) => {
    const comment = new Comment({
        comment: req.body.comment,
        name: req.body.name,
        email: req.body.email
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
module.exports = {createComment, getComments}
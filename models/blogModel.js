const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    totalDescription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Blog', BlogSchema);

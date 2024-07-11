const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const sudheer = require('../config/multer');

router.get('/blogs', blogController.getBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', sudheer.upload, blogController.createBlog);

module.exports = router;

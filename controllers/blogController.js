const Blog = require('../models/blogModel');
const {S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const AWS = require('@aws-sdk/client-s3')
const  {s3} = require('../config/multer'); 
const crypto = require('crypto');
const randomIamgeName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Cannot find blog' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createBlog = async (req, res) => {
    const { title, shortDescription, totalDescription } = req.body;
    const picture = req.file ? req.file.path : '';

    const imagename = randomIamgeName()
            const bucketName =process.env.BUCKET_NAME
            const params = {
                Bucket : bucketName,
                Key :imagename ,
                Body : req.file.buffer,
                ContentType : req.file.mimetype,
            }

            const command = new PutObjectCommand(params)
            await s3.send(command)
            var getObjectParams = { Bucket: bucketName, Key: imagename}
            const url = await getSignedUrl( s3 ,new GetObjectCommand(getObjectParams) )
            console.log(url)
    const blog = new Blog({
        title,
        picture: url,
        shortDescription,
        totalDescription,
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json({message:"Blog Created succesfully",newBlog});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
module.exports = {createBlog, getBlogs, getBlogById}
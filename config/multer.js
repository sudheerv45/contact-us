const multer = require('multer');
const path = require('path');
require('dotenv').config();
const AWS = require('@aws-sdk/client-s3')



console.log(process.env.BUCKET_NAME , process.env.BUCKET_REGION, process.env.SECRET_KEY, process.env.SECRET_ACCESS_KEY);

const bucketRegion =process.env.BUCKET_REGION
const accessKey =process.env.SECRET_KEY
const secretAccessKey =process.env.SECRET_ACCESS_KEY
const s3 = new AWS.S3({
    region : bucketRegion,
    credentials:{
    accessKeyId : accessKey,
    secretAccessKey : secretAccessKey,
    },
    
    
})

// Set storage engine
const storage = multer.memoryStorage()
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('picture'); // 'picture' is the field name

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = {upload, s3}

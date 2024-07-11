const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');



router.post('/addadmin', adminController.createAdmin );
router.post('/adminlogin', adminController.loginAdmin);

module.exports = router;
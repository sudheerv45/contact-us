const express = require('express');
const router = express.Router();
const needHelpController = require('../controllers/needHelpController');

router.get('/needhelps', needHelpController.getNeedHelps);
router.post('/needhelps', needHelpController.createNeedHelp);

module.exports = router;

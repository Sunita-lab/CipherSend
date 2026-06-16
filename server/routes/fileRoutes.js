const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const { uploadFile } = require('../controllers/fileController');

router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

module.exports = router;
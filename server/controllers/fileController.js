const File = require('../models/File');
const upload = require('../config/multer');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const file = await File.create({
      originalName: req.file.originalname,
      encryptedName: req.file.filename,
      size: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: req.user.id
    });

    res.status(201).json({ message: 'File uploaded!', file });

  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};
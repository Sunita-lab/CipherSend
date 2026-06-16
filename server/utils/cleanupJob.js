const cron = require('node-cron');
const File = require('../models/File');
const fs = require('fs');
const path = require('path');

const cleanupExpiredFiles = async () => {
  try {
    console.log('Running cleanup job...');

    // Expired ya limit reach files dhundo
    const expiredFiles = await File.find({
      $or: [
        { expiresAt: { $lt: new Date() } },
        { $expr: { $gte: ['$downloadCount', '$downloadLimit'] } }
      ]
    });

    for (const file of expiredFiles) {
      // Storage se delete karo
      const filePath = path.join('uploads', file.encryptedName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${file.encryptedName}`);
      }
      // Database se delete karo
      await file.deleteOne();
    }

    console.log(`Cleanup done! ${expiredFiles.length} files removed.`);
  } catch (err) {
    console.error('Cleanup error:', err);
  }
};

// Har ghante chalega
const startCleanupJob = () => {
  cron.schedule('0 * * * *', cleanupExpiredFiles);
  console.log('Cleanup job scheduled!');
};

module.exports = { startCleanupJob, cleanupExpiredFiles };
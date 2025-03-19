const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const folders = ['./uploads/images/', './uploads/videos/', './uploads/pdfs/'];
folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
});

// Define allowed file types
const allowedMimeTypes = [
  'image/jpeg', 'image/png', 'image/gif',
  'video/mp4', 'video/mpeg', 'video/quicktime',
  'application/pdf'
];

// Set up storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let folder = './uploads/'; // Default folder

//     if (file.mimetype.startsWith('image')) {
//       folder = './uploads/images/';
//     } else if (file.mimetype.startsWith('video')) {
//       folder = './uploads/videos/';
//     } else if (file.mimetype === 'application/pdf') {
//       folder = './uploads/pdfs/';
//     }

//     cb(null, folder);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   }
// });

//set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = './uploads/'; // Default folder

    if (file.mimetype.startsWith('image')) {
      folder = './uploads/images/';
    } else if (file.mimetype.startsWith('video')) {
      folder = './uploads/videos/';
    } else if (file.mimetype === 'application/pdf') {
      folder = './uploads/pdfs/';
    }

    console.log(`File type: ${file.mimetype}. Saving to folder: ${folder}`);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Allowed: JPEG, PNG, GIF, MP4, PDF.'));
  }
};

// Upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB max file size
});

module.exports = upload;
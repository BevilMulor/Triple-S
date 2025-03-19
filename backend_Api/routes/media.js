const express = require('express');
const upload = require('../uploads/upload'); // Import multer config
const Media = require('../models/Media'); // Import Media model
const router = express.Router();
const path = require('path');

// // ✅ Upload a file with uploader info
// router.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         console.log('Saving file...');
//         console.log("Media request: ", req.body);

//         const { userId, userType } = req.body; // Get uploader info

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         // Validate required fields
//         if (!userId || !userType) {
//             return res.status(400).json({ message: 'Uploader information is required' });
//         }

//         // Save file details in MongoDB
//         const newMedia = new Media({
//             mediaContent: [{
//                 fileType: req.file.mimetype,
//                 fileUrl: `/uploads/${req.file.filename}`
//             }],
//             uploadedBy: {
//                 userId,
//                 userType
//             }
//         });

//         await newMedia.save();

//         res.status(201).json({ message: 'File uploaded successfully', fileUrl: newMedia.mediaContent[0].fileUrl });
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }

// });

// ✅ Upload a file with uploader info and save it to MongoDB
router.post('/upload', upload.single('file'), async (req, res) => {
    // Define a function to get the media type folder
    function getMediaTypeFolder(fileType) {
        if (fileType.includes('image')) {
            return 'images';
        } else if (fileType.includes('video')) {
            return 'videos';
        } else {
            return 'others';  // fallback if it's neither image nor video
        }
    }
    
    try {
        console.log('Saving file...');
        console.log("Media request: ", req.body);

        // Extract uploader info from the body
        const { uploaderId, uploaderRole } = req.body;  // Assuming the request contains these fields
        if (!uploaderId || !uploaderRole) {
            return res.status(400).json({ message: 'Uploader information is required' });
        }

        // Ensure a file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Construct the full URL for the file
        const fullFileUrl = `${req.protocol}://${req.get('host')}/uploads/${getMediaTypeFolder(req.file.mimetype)}/${req.file.filename}`;

        // Save file details in MongoDB (if required)
        const newMedia = new Media({
            mediaContent: [{
                fileType: req.file.mimetype,
                fileUrl: fullFileUrl  // Set the full URL here
            }],
            uploadedBy: {
                userId: uploaderId,
                userType: uploaderRole
            }
        });

        // Save to database
        await newMedia.save();

        // Send success response with the full file URL
        res.status(201).json({ message: 'File uploaded successfully', fileUrl: newMedia.mediaContent[0].fileUrl });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ✅ Fetch a file by fileUrl
router.get('/getFile', (req, res) => {
    const { fileUrl } = req.query; // Get fileUrl from query string

    if (!fileUrl) {
        return res.status(400).json({ message: 'No file URL provided' });
    }

    const filePath = path.join(__dirname, '../uploads', path.basename(fileUrl)); // Ensure safe file path resolution

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error fetching file:', err);
            return res.status(404).json({ message: 'File not found' });
        }
    });
});

// ✅ Fetch all files with uploader details
router.get('/getAllFiles', async (req, res) => {
    try {
        const mediaFiles = await Media.find()
            .populate({
                path: 'uploadedBy.userId',
                select: 'email discipline' // Populate uploader details
            })
            .exec();

        res.status(200).json(mediaFiles);
    } catch (error) {
        console.error('Error fetching media files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
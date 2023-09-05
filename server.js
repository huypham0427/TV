// server.js

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Add 'application/pdf'
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
        }
    }
});

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images


app.use(cors());


// Handle POST request to /upload
// app.post('/upload', upload.single('image'), (req, res) => {
//     const imageUrl = `http://35.160.120.126:${port}/${req.file.path}`;
//     console.log(req.file);
//     res.json({ imageUrl });
// });
app.post('/upload/:type', upload.single('file'), (req, res) => {
    const baseUrl = `https://35.160.120.126:${port}`;

    if (req.params.type === 'image' || req.params.type === 'pdf') {
        const fileUrl = `${baseUrl}/${req.file.path}`;
        res.json({ fileUrl });
    } else {
        res.status(400).json({ error: 'Invalid file type.' });
    }
});
       
app.get('/fetch-images', (req, res) => {
    // Retrieve the list of image files from the 'uploads' directory
    const imageFiles = fs.readdirSync('uploads');
    const imageUrls = imageFiles.map(file => `https://35.160.120.126:${port}/uploads/${file}`);
    res.json({ imageUrls });
});

app.get('/fetch-files', (req, res) => {
    // Retrieve the list of all files from the 'uploads' directory
    const fileNames = fs.readdirSync('uploads');
    
    // Construct URLs for each file
    const fileUrls = fileNames.map(fileName => {
        return `https://35.160.120.126:${port}/uploads/${fileName}`;
    });

    res.json({ fileUrls });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

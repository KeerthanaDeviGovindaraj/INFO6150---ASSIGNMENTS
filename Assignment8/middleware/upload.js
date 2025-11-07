const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { upload, handleMulterError } = require('../middleware/upload');

const imagesDir = path.join(__dirname, '../images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },

    filename: function (req, file, cb) {
        try {
            const email = req.body.email;
            if (!email) {
                return cb(new Error('Email is required for file upload'));
            }
            
            const timestamp = Date.now();
            const ext = path.extname(file.originalname).toLowerCase();
            const nameWithoutExt = path.basename(file.originalname, ext);
            
            const sanitizedEmail = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_');
            
            const filename = `${sanitizedEmail}_${timestamp}_${nameWithoutExt}${ext}`;
            cb(null, filename);
        } catch (error) {
            cb(error);
        }
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'), false);
    }
    
    if (!allowedExtensions.includes(ext)) {
        return cb(new Error('Invalid file extension. Only .jpg, .jpeg, .png, and .gif are allowed.'), false);
    }
    
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, 
        files: 1
    }
});

const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'File size too large. Maximum size is 5MB.'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                error: 'Too many files. Only 1 file allowed.'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                error: 'Unexpected field name. Use "image" as the field name.'
            });
        }
        return res.status(400).json({
            error: `Upload error: ${err.message}`
        });
    } else if (err) {
        return res.status(400).json({
            error: err.message
        });
    }
    next();
};

router.post('/uploadImage', upload.single('image'), handleMulterError, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: 'Email is required to upload image.'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                error: 'No image file uploaded.'
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                error: 'User not found.'
            });
        }

        if (user.imagePath) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                error: 'Image already exists for this user.'
            });
        }

        user.imagePath = `/images/${req.file.filename}`;
        await user.save();

        res.status(201).json({
            message: 'Image uploaded successfully.',
            filePath: user.imagePath
        });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        console.error('Error uploading image:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});


module.exports = {

    upload,
    handleMulterError
};
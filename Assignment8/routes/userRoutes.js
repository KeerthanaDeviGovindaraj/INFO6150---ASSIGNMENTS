const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { validateUserCreation, validateUserUpdate } = require('../utils/validation');
const { upload, handleMulterError } = require('../middleware/upload');

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with validation for email, full name, and password strength
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *             validUser:
 *               summary: Valid user data
 *               value:
 *                 fullName: "John Doe"
 *                 email: "john@example.com"
 *                 password: "Pass@123"
 *             invalidEmail:
 *               summary: Invalid email format
 *               value:
 *                 fullName: "John Doe"
 *                 email: "invalid-email"
 *                 password: "Pass@123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               invalidEmail:
 *                 summary: Invalid email format
 *                 value:
 *                   error: "Validation failed."
 *                   details: ["Invalid email format"]
 *               weakPassword:
 *                 summary: Weak password
 *                 value:
 *                   error: "Validation failed."
 *                   details: ["Password must be at least 8 characters long"]
 *               duplicateEmail:
 *                 summary: Email already exists
 *                 value:
 *                   error: "Validation failed."
 *                   details: ["User with this email already exists"]
 */
router.post('/create', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const validation = validateUserCreation({ fullName, email, password });
        if (!validation.isValid) {
            return res.status(400).json({
                error: 'Validation failed.',
                details: validation.errors
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                error: 'Validation failed.',
                details: ['User with this email already exists']
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'User created successfully.'
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user details
 *     description: Update full name and/or password for an existing user. Email cannot be updated.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *           examples:
 *             updateName:
 *               summary: Update full name only
 *               value:
 *                 email: "john@example.com"
 *                 fullName: "Jane Doe"
 *             updatePassword:
 *               summary: Update password only
 *               value:
 *                 email: "john@example.com"
 *                 password: "NewPass@456"
 *             updateBoth:
 *               summary: Update both name and password
 *               value:
 *                 email: "john@example.com"
 *                 fullName: "Jane Smith"
 *                 password: "SecurePass@789"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User not found."
 */
router.put('/edit', async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        if (!email) {
            return res.status(400).json({
                error: 'Validation failed.',
                details: ['Email is required to identify the user']
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                error: 'User not found.'
            });
        }

        const updateData = {};
        if (fullName) updateData.fullName = fullName;
        if (password) updateData.password = password;

        const validation = validateUserUpdate(updateData);
        if (!validation.isValid) {
            return res.status(400).json({
                error: 'Validation failed.',
                details: validation.errors
            });
        }

        if (fullName) {
            user.fullName = fullName.trim();
        }

        if (password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(password, saltRounds);
        }

        await user.save();

        res.status(200).json({
            message: 'User updated successfully.'
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by email. Also deletes associated image file if exists.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDelete'
 *           example:
 *             email: "john@example.com"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User not found."
 */
router.delete('/delete', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: 'Validation failed.',
                details: ['Email is required to delete the user']
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(404).json({
                error: 'User not found.'
            });
        }

        if (user.imagePath) {
            const imagePath = path.join(__dirname, '..', user.imagePath);
            
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`Deleted image file: ${imagePath}`);
            }
        }

        await User.deleteOne({ email: email.toLowerCase() });

        res.status(200).json({
            message: 'User deleted successfully.'
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users with their details including hashed passwords
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserResponse'
 *             example:
 *               users:
 *                 - fullName: "John Doe"
 *                   email: "john@example.com"
 *                   password: "$2b$10$abcdefghijklmnopqrstuvwxyz"
 *                 - fullName: "Jane Smith"
 *                   email: "jane@example.com"
 *                   password: "$2b$10$zyxwvutsrqponmlkjihgfedcba"
 */
router.get('/getAll', async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email password imagePath');

        const userList = users.map(user => ({
            fullName: user.fullName,
            email: user.email,
            password: user.password  
        }));

        res.status(200).json({
            users: userList
        });

    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload user profile image
 *     description: Upload a profile image for a user. Only JPEG, PNG, and GIF formats allowed. One image per user.
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - image
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *                 example: "john@example.com"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, or GIF, max 5MB)
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageUploadResponse'
 *       400:
 *         description: Validation error or duplicate image
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               duplicateImage:
 *                 summary: Image already exists
 *                 value:
 *                   error: "Image already exists for this user."
 *               invalidFormat:
 *                 summary: Invalid file format
 *                 value:
 *                   error: "Invalid file format. Only JPEG, PNG, and GIF are allowed."
 *               noFile:
 *                 summary: No file uploaded
 *                 value:
 *                   error: "No image file uploaded."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User not found."
 */
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

module.exports = router;
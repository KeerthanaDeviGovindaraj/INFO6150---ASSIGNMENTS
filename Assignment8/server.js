const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { swaggerUi, specs} = require('./swagger');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
    console.log('Images directory created');
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

const userRoutes = require('./routes/userRoutes');

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'User API Server is running',
        endpoints: {
            createUser: 'POST /user/create',
            getAllUsers: 'GET /user/getAll',
            updateUser: 'PUT /user/edit',
            deleteUser: 'DELETE /user/delete',
            uploadImage: 'POST /user/uploadImage'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the API at http://localhost:${PORT}`);
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'User Management API Docs'
}));

app.get('/', (req, res) => {
    res.json({ 
        message: 'User API Server is running',
        documentation: 'http://localhost:3000/api-docs',
        endpoints: {
            createUser: 'POST /user/create',
            getAllUsers: 'GET /user/getAll',
            updateUser: 'PUT /user/edit',
            deleteUser: 'DELETE /user/delete',
            uploadImage: 'POST /user/uploadImage'
        }
    });
});
module.exports = app;
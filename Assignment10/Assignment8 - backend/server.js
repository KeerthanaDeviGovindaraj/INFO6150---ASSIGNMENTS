const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
    console.log('Images directory created');
}

// Serve static files
app.use('/images', express.static(imagesDir));

// Import routes
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

// Use routes with /api prefix
app.use('/api', userRoutes);
app.use('/api', jobRoutes);

// MongoDB connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// Connect to database
connectDB();

// Mongoose connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'User Management API Docs'
}));

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'User API Server is running',
        documentation: 'http://localhost:3000/api-docs',
        endpoints: {
            createUser: 'POST /api/user/create',
            loginUser: 'POST /api/user/login',
            getAllUsers: 'GET /api/users',
            createJob: 'POST /api/create/job',
            getAllJobs: 'GET /api/jobs'
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the API at http://localhost:${PORT}`);
});

module.exports = app;
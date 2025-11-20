const express = require('express');
const router = express.Router();
const { createJob, getAllJobs } = require('../controllers/jobController');

// POST /api/create/job - Create new job
router.post('/create/job', createJob);

// GET /api/jobs - Get all jobs
router.get('/jobs', getAllJobs);

module.exports = router;
const Job = require('../models/Job');

// Create new job (Admin only)
const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body;

    // Validate all fields
    if (!companyName || !jobTitle || !description || !salary) {
      return res.status(400).json({ 
        error: 'All fields are required',
        details: ['companyName, jobTitle, description, and salary are required']
      });
    }

    // Create new job
    const newJob = new Job({
      companyName,
      jobTitle,
      description,
      salary
    });

    await newJob.save();

    res.status(201).json({ 
      message: 'Job created successfully',
      job: newJob
    });

  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      message: 'Jobs fetched successfully',
      count: jobs.length,
      jobs
    });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

module.exports = {
  createJob,
  getAllJobs
};
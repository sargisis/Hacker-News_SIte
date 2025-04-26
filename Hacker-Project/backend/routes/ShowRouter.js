import express from 'express';
const Showrouter = express.Router();
import Job from '../models/Jobs.js';
import authMiddleware from '../middleware/authmiddleware.js';


Showrouter.post('/submit-job', authMiddleware, async (req, res) => {
  try {
    const { title, description, company, location, salary, contact } = req.body;
    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      contact,
      author: req.user._id,
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Failed to create job', error });
  }
});

Showrouter.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().populate('author', 'username');
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs', error });
  }
});


Showrouter.get('/job/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId).populate('author', 'username');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: 'Failed to fetch job details', error });
  }
});

export default Showrouter;
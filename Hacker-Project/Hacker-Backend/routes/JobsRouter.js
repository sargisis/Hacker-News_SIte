import express from "express";
import Job from "../models/Jobs";

const Jobrouter = express.Router()

Jobrouter.get('/jobs', async (req, res) => {
    try {
      const jobs = await Job.find().populate('author', 'username');
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch jobs', error });
    }
});

export default Jobrouter;
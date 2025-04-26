import express from 'express';
import mongoose from 'mongoose';
import News from '../models/News.js';

const router = express.Router();


router.post('/', async (req, res) => {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({ message: "Required" });
  }

  try {
    const newPost = new News({
      title,
      content,
      authorId: mongoose.Types.ObjectId(authorId),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost); 
  } catch (error) {
    console.error("Error when saved:", error);
    res.status(500).json({ message: "Error Server" });
  }
});


router.get('/', async (req, res) => {
  try {
    const posts = await News.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error when load news" });
  }
});

export default router;

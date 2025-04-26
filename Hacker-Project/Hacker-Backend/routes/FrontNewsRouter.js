import express from 'express';
import Comment from '../models/Comments.js';

const routerFront = express.Router();

routerFront.get('/', async (req, res) => {
    try {
      const frontComments = await Comment.find().sort({ date: -1 });
      res.json(frontComments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      res.status(500).json({ message: err.message });
    }
});

routerFront.post('/', async (req, res) => {
    const { postId, content, author } = req.body;

    if (!postId || !content || !author) {
        return res.status(400).json({ message: "postId, content, and author are required" });
    }

    try {
      const newComment = new Comment({ postId, content, author });
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (err) {
      console.error('Error saving comment:', err);
      res.status(400).json({ message: err.message });
    }
});

export default routerFront;
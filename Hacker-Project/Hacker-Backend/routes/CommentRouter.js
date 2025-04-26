import express from 'express';
import Comment from '../models/Comments.js';

const Commentrouter = express.Router();


Commentrouter.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { content, author } = req.body;
    const postId = req.params.postId;
    const newComment = new Comment({
      postId,
      content,
      author,
      date: new Date().toLocaleString(),
    });
    const savedComment = await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', comment: savedComment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment', details: err.message });
  }
});

Commentrouter.get('/posts/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId, parentComment: null }).sort({ date: -1 }); 
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get comments' });
  }
});


Commentrouter.post('/:parentId/replies', async (req, res) => {
  try {
    const { content, author } = req.body;
    const parentComment = req.params.parentId;
    const postId = (await Comment.findById(parentComment)).postId; 
    const newReply = new Comment({
      postId,
      parentComment,
      content,
      author,
      date: new Date().toLocaleString(),
    });
    const savedReply = await newReply.save();
    res.status(201).json({ message: 'Reply added successfully', reply: savedReply });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add reply', details: error.message });
  }
});


Commentrouter.get('/:parentId/replies', async (req, res) => {
  try {
    const parentId = req.params.parentId;
    const replies = await Comment.find({ parentComment: parentId }).sort({ date: 1 });
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get replies' });
  }
});

export default Commentrouter;
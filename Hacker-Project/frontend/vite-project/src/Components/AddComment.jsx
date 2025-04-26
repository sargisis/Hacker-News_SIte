import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createComment } from '../../Api/ApiService';

const AddComment = ({ postId, onCommentAdded }) => {

  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const handleSubmit = async () => {
    if (!commentText.trim() || !commentAuthor.trim()) {
      alert('Please enter your name and comment.');
      return;
    }

    try {
      const response = await createComment(postId, {
        content: commentText,
        author: commentAuthor,
      });
      console.log('Comment added:', response);
      setCommentText('');
      setCommentAuthor('');
      onCommentAdded();
    } catch (error) {
      alert('Error adding comment:', error);
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Add New Comment
      </Typography>
      <TextField
        label="Your Name"
        fullWidth
        value={commentAuthor}
        onChange={(e) => setCommentAuthor(e.target.value)}
        sx={{ mb: 1 }}
      />
      <TextField
        label="Comment"
        multiline
        rows={4}
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="warning" onClick={handleSubmit}>
        Submit Comment
      </Button>
    </Box>
  );
};

export default AddComment;
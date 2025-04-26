import React, { useState, useEffect } from 'react';
import { NewCommentFetch } from '../../Api/ApiService';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from '@mui/material';

const NewestCommentsDisplay = () => {
  const [newestComments, setNewestComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewestComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await NewCommentFetch();
        const commentsData = response.data;
        if (Array.isArray(commentsData)) {
          setNewestComments(commentsData);
        } else {
          setError("Invalid data format for newest comments");
        }
      } catch (err) {
        console.error("Failed to fetch newest comments:", err);
        setError("Failed to load newest comments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewestComments();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Newest Comments
      </Typography>
      {newestComments.length > 0 ? (
        newestComments.map((comment) => (
          <Card key={comment._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">{comment.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {comment.content}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                By: {comment.author} | {comment.date}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No newest comments available.</Typography>
      )}
    </Container>
  );
};

export default NewestCommentsDisplay;
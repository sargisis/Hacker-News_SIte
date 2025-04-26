import React, { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchCommentsByPostId, submitReply, fetchRepliesByCommentId } from "../../Api/ApiService";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Button,
  TextField,
} from "@mui/material";
import AddComment from "./AddComment";

const NewsDetails = () => {
  const { id } = useParams();

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replies, setReplies] = useState({});

  const getComments = useCallback(async () => {
    if (newsItem?._id) {
      try {
        
        const response = await fetchCommentsByPostId(newsItem._id);
        setComments(response.data);
      } catch (error) {
        alert("Failed to fetch comments:", error);
      }
    }
  }, [newsItem]);

  const getReplies = useCallback(async (parentId) => {
    try {
      const response = await fetchRepliesByCommentId(parentId);
      setReplies(prevReplies => ({ ...prevReplies, [parentId]: response.data }));
    } catch (error) {
      alert("Failed to fetch replies:" , error)
    }
  }, []);

  useEffect(() => {
    const getNewsDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPostById(id);
        setNewsItem(response.data);
      } catch (err) {
        setError(err.message || "Failed to load news details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getNewsDetails();
  }, [id]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    comments.forEach(comment => {
      getReplies(comment._id);
    });
  }, [comments, getReplies]);

  const handleCommentAdded = () => {
    getComments();
  };

  const handleReplyClick = (commentId) => {
    setReplyingToCommentId(commentId === replyingToCommentId ? null : commentId);
    setReplyText('');
    setReplyAuthor('');
  };

  const handleReplySubmit = async (parentCommentId, replyContent) => {
    if (!replyContent.trim() || !replyAuthor.trim()) {
      alert('Please enter your reply and your name.');
      return;
    }

    try {
      await submitReply(parentCommentId, { content: replyContent, author: replyAuthor });
      setReplyText('');
      setReplyAuthor('');
      setReplyingToCommentId(null);
      getReplies(parentCommentId);
      alert('Reply submitted successfully!');
    } catch (error) {
      alert('Failed to submit reply.' , error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!newsItem) {
    return <Typography>News item not found.</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        {newsItem.title || "No title"}
      </Typography>
      <Card style={{ marginBottom: "1.5rem", borderRadius: 14, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Typography variant="body1">{newsItem.content || "No content"}</Typography>
          {newsItem.authorId && (
            <Typography
              variant="caption"
              display="block"
              color="textSecondary"
              style={{ marginTop: "0.5rem" }}
            >
              Author: {newsItem.authorId.username}
            </Typography>
          )}
        </CardContent>
      </Card>

      <AddComment postId={id} onCommentAdded={handleCommentAdded} />

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Box key={comment._id} mb={2}>
              <Card sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {comment.author} - {comment.date}
                  </Typography>
                </Box>
                <Typography variant="body2">{comment.content}</Typography>
                <Box mt={1}>
                  <Button size="small" color="primary" onClick={() => handleReplyClick(comment._id)}>
                    Reply
                  </Button>
                  {replyingToCommentId === comment._id && (
                    <Box mt={2}>
                      <TextField
                        label="Your Name"
                        fullWidth
                        value={replyAuthor}
                        onChange={(e) => setReplyAuthor(e.target.value)}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Reply"
                        multiline
                        rows={2}
                        fullWidth
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <Box mt={1} display="flex" justifyContent="flex-end">
                        <Button size="small" color="primary" onClick={() => handleReplySubmit(comment._id, replyText)}>
                          Submit Reply
                        </Button>
                        <Button size="small" onClick={() => setReplyingToCommentId(null)}>
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>

                {replies[comment._id] && replies[comment._id].length > 0 && (
                  <Box ml={3} mt={1}>
                    {replies[comment._id].map(reply => (
                      <Card key={reply._id} sx={{ p: 2, mb: 1, backgroundColor: '#f9f9f9' }}>
                        {reply.replyingToAuthor && (
                          <Typography variant="caption" color="textSecondary" gutterBottom>
                            Replying to {reply.replyingToAuthor}
                          </Typography>
                        )}
                        <Typography variant="subtitle2" color="textSecondary">
                          {reply.author} - {reply.date}
                        </Typography>
                        <Typography variant="body2">{reply.content}</Typography>
                      </Card>
                    ))}
                  </Box>
                )}
              </Card>
            </Box>
          ))
        ) : (
          <Typography color="textSecondary">No comments yet.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default NewsDetails;
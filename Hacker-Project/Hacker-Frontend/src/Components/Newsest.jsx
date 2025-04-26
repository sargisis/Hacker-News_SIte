import React, { useEffect, useState } from "react";
import { fetchNewest } from "../../Api/ApiService";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Button
} from "@mui/material";
import { Link } from 'react-router-dom';

const Newsest = () => {
  const [newestPosts, setNewestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNewestPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchNewest();
        const newestData = response.data;
        if (!Array.isArray(newestData)) {
          throw new Error("Invalid data format: expected array");
        }
        setNewestPosts(newestData);
      } catch (err) {
        setError(err.message || "Failed to load newest posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getNewestPosts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        ✨ Newest Posts
      </Typography>
      {newestPosts.map((item) => (
        <Card
          key={item._id || Math.random()}
          style={{
            marginBottom: "1.5rem",
            borderRadius: 14,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="secondary">
              {item.title || "No title"}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "0.5rem" }}>
              {item.content || "No content"}
            </Typography>
            {item.authorId && (
              <Typography
                variant="caption"
                display="block"
                color="textSecondary"
                style={{ marginTop: "0.5rem" }}
              >
                Author: {item.authorId.username}
              </Typography>
            )}
            <Typography
              variant="caption"
              display="block"
              color="textSecondary"
              style={{ marginTop: "0.3rem" }}
            >
              Created At: {new Date(item.createdAt).toLocaleString()}
            </Typography>
            <Link to={`/news/${item._id}`} style={{ textDecoration: 'none' }}>
              <Button size="small" style={{ marginTop: "1rem" }} variant="outlined" color="primary">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
      {newestPosts.length === 0 && (
        <Typography variant="body1">No newest posts available.</Typography>
      )}
    </Container>
  );
};

export default Newsest;
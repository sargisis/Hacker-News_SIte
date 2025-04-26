import React, { useEffect, useState } from "react";
import { fetchNews } from "../../Api/ApiService";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { Link } from 'react-router-dom';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchNews();
        const newsData = response.data;
        if (!Array.isArray(newsData)) {
          throw new Error("Invalid data format: expected array");
        }
        setNews(newsData);
      } catch (err) {
        setError(err.message || "Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
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
        📰 Latest News
      </Typography>
      {news.map((item) => (
        <Card
          key={item._id || Math.random()}
          style={{
            marginBottom: "1.5rem",
            borderRadius: 14,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="primary">
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
             comment: {new Date(item.createdAt).toLocaleString()}
            <Button size="small" component={Link} to={`/news/${item._id}`}>
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default News;
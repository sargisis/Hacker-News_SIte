import React, { useState, useEffect } from 'react';
import { fetchFront } from '../../Api/ApiService';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDay = styled(Paper)(({ theme, isToday, isSelected }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 36,
  height: 36,
  borderRadius: '50%',
  margin: '4px',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  ...(isToday && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
  }),
  ...(isSelected && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));


const FrontNewsDisplay = () => {
  const [frontNews, setFrontNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFrontNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFront();
        const frontNewsData = response.data;
        if (!Array.isArray(frontNewsData)) {
          throw new Error("Invalid data format: expected an array for front news");
        }
        setFrontNews(frontNewsData);
      } catch (err) {
        alert("Failed to fetch front news:", err);
        setError(err.message || "Failed to load front news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getFrontNews();
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
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔥 Front Page News
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Latest News
        </Typography>
        {frontNews.length > 0 ? (
          frontNews.map((newsItem) => (
            <Card
              key={newsItem._id || Math.random()}
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {newsItem.title || "No Title"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {newsItem.content || "No Content"}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>

                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No news available.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default FrontNewsDisplay;
import React, { useState, useEffect } from 'react';
import { fetchJobs } from '../../Api/ApiService';
import {
  Container,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Button,
  styled,
  CircularProgress,
  Alert,
  Collapse,
} from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderRadius: theme.shape.borderRadius,
}));

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchJobs();
        setJobs(response.data);
      } catch (error) {
        alert('Error fetching jobs:', error);
        setError('Failed to load job listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Available Job Openings
      </Typography>
      <List>
        {jobs.map((job) => (
          <ListItem key={job._id} disableGutters sx={{ flexDirection: 'column', alignItems: 'stretch', mb: 2 }}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {job.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Company: {job.company}
                </Typography>
                {job.location && (
                  <Typography color="textSecondary" gutterBottom>
                    Location: {job.location}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {job.description.substring(0, 150)}...
                </Typography>
                <Button size="small" onClick={() => handleViewDetails(job._id)}>
                  {expandedJobId === job._id ? 'Hide Details' : 'View Details'}
                </Button>
                <Collapse in={expandedJobId === job._id} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    {job.description}
                  </Typography>
                  {job.salary && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Salary: {job.salary}
                    </Typography>
                  )}
                  {job.contact && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Contact: {job.contact}
                    </Typography>
                  )}
                </Collapse>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
                  Posted on: {new Date(job.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </StyledCard>
          </ListItem>
        ))}
      </List>
      {jobs.length === 0 && (
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
          No job listings available at the moment.
        </Typography>
      )}
    </Container>
  );
};

export default JobList;
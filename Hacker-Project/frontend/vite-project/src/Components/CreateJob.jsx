import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { createJob } from '../../Api/ApiService';
import { useNavigate } from 'react-router-dom';
import { orange } from '@mui/material/colors';

const CreateJobForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Job'); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (title && company && content) {
      const jobData = {
        title: title,
        company: company,
        description: content,
        url: url,
        type: type, 
      };

      try {
        const response = await createJob(jobData);
        console.log('Job created successfully:', response);
        setSuccessMessage('Job created successfully!');
        setErrorMessage('');
        setTitle('');
        setCompany('');
        setUrl('');
        setContent('');
        setType('Job'); 
      } catch (error) {
        alert('Error creating job:', error);
        setErrorMessage('Error creating job.');
        setSuccessMessage('');
      }
    } else {
      setErrorMessage('Please fill in the title, company, and content.');
      setSuccessMessage('');
    }
  };

  const handleClear = () => {
    setTitle('');
    setCompany('');
    setUrl('');
    setContent('');
    setType('Job');
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    navigate('/show');
  };

  const handleHome = () => {
    console.log('Home clicked');
    navigate('/jobs');
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Create Job Posting
      </Typography>
      {successMessage && <Typography color="success">{successMessage}</Typography>}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <TextField
        label="Title *"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Company *"
        fullWidth
        margin="normal"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <TextField
        label="URL"
        fullWidth
        margin="normal"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <TextField
        label="Content *"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          value={type}
          label="Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="Job">Job</MenuItem>
          <MenuItem value="Ask">Ask</MenuItem>      
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ bgcolor: orange[500], color: 'white', '&:hover': { bgcolor: orange[700] } }} onClick={handleSubmit}>
        Create
      </Button>
      <Button sx={{ ml: 2 }} onClick={handleClear}>
        Clear
      </Button>
      <Button sx={{ ml: 2 }} onClick={handleCancel}>
        Cancel
      </Button>
      <Button sx={{ ml: 2 }} onClick={handleHome}>
        Jobs
      </Button>
    </div>
  );
};

export default CreateJobForm;
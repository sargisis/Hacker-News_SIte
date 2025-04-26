import React, { useState } from 'react';
import { Box, Typography, Link, TextField, InputAdornment, IconButton } from '@mui/material';
import { orange } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        textAlign: 'center',
        borderTop: `1px solid ${orange[500]}`,
        mt: 3,
      }}
    >
      <Box sx={{ mb: 0.5 }}>
        <Link
          component="button"
          onClick={() => handleLinkClick('/guidelines')} 
          color="inherit"
          underline="none"
          sx={{ mr: 0.5, fontSize: '0.8rem', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
        >
          Guidelines
        </Link>
        <Typography component="span" color="textSecondary" sx={{ mr: 0.5, fontSize: '0.8rem' }}>
        </Typography>
        <Link
          component="button"
          onClick={() => handleLinkClick('/faq')} 
          color="inherit"
          underline="none"
          sx={{ mr: 0.5, fontSize: '0.8rem', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
        >
          FAQ
        </Link>
        
        <Typography component="span" color="textSecondary" sx={{ mr: 0.5, fontSize: '0.8rem' }}>
        </Typography>
        <Link
          component="button"
          onClick={() => handleLinkClick('/comments')} 
          color="inherit"
          underline="none"
          sx={{ fontSize: '0.8rem', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
        >
          Contact
        </Link>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography component="span" color="textSecondary" sx={{ mr: 0.5, fontSize: '0.8rem' }}>
          Search:
        </Typography>
        <TextField
          size="small"
          sx={{ maxWidth: 200 }}
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
          InputProps={{
            style: { fontSize: '0.8rem' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchSubmit} size="small">
                  <SearchIcon color="action" sx={{ fontSize: '0.9rem' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Footer;
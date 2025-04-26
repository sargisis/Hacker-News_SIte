import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const NavBar = styled(Box)({ 
    display: 'flex',
    height: '50px',
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    padding: '0',             
    fontFamily: 'Arial, sans-serif',
    margin: '0',
    boxSizing: 'border-box',
 });

const NavLink = styled('a')({
    color: '#fff', 
    textDecoration: 'none',
    alignItems: 'flex-start',
    marginLeft: '10px',
    margin: '0 10px',
    fontSize: '14px',
    fontWeight: 'bold',
    '&:hover': {
        textDecoration: 'underline',
    },
});

function Navigator() {
  return ( 
    <NavBar>
      <NavLink href='/news'>Hacker News</NavLink>
      <NavLink href="/newsest">new</NavLink>
      <NavLink href="/front">past</NavLink>
      <NavLink href="/comment">comments</NavLink>
      <NavLink href="/ask">ask</NavLink>
      <NavLink href="/show">show</NavLink>
      <NavLink href="/jobs">jobs</NavLink>
      <NavLink href="/submit">posts</NavLink>
      <NavLink href='/register'>registration</NavLink>
      <NavLink href="/login">login</NavLink>
    </NavBar>
  );
}

export default Navigator;

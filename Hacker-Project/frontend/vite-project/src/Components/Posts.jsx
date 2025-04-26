import React, { useState } from 'react';
import { createPost } from '../../Api/ApiService';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';

const Posts = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
        title: title,
        content: content,
        };

        try {
        console.log("Submitting form data:", formData);
        const response = await createPost(formData);
        alert("✅ Post added:")
        setTitle("");
        setContent("");
        navigate("/submit"); 
        } catch (error) {
        alert("❌ error in added posting:", error.message);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
          <Paper style={{ padding: "2rem", backgroundColor: "#f7f7f7", borderRadius: "8px" }}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
              Create Post
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ marginBottom: "1rem", backgroundColor: "#fff", borderRadius: "8px" }}
              />
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ marginBottom: "1rem", backgroundColor: "#fff", borderRadius: "8px" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#ff6600", padding: "10px 20px", fontSize: "16px", borderRadius: "4px" }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Container>
    )
};

export default Posts;
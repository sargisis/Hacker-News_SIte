import React, { useState, useEffect } from 'react';
import { fetchQuestions, createQuestion, addAnswer } from '../../Api/ApiService';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  CircularProgress,
  Box,
  TextField,
  Button,
  styled,
} from '@mui/material';
import { orange } from '@mui/material/colors';

const QuestionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const AnswerBox = styled(Box)(({ theme }) => ({
  ml: theme.spacing(4),
  mt: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  borderLeft: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
}));

const Ask = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchQuestions();
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          setQuestions([response.data]);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateQuestion = async () => {
    if (newQuestionTitle && newQuestionContent) {
      const questionData = { title: newQuestionTitle, content: newQuestionContent };
      try {
        await createQuestion(questionData);
        const response = await fetchQuestions();
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          setQuestions([response.data]);
        }
        setNewQuestionTitle('');
        setNewQuestionContent('');
      } catch (error) {
        console.error('Error creating question:', error);
        setError('Error creating question');
      }
    } else {
      setError('Please fill in the question title and content.');
    }
  };

  const handleAnswerClick = (questionId) => {
    setSelectedQuestionId(questionId);
    setAnswerText('');
  };

  const handleAnswerSubmit = async (questionId, answerContent) => {
    try {
      await addAnswer(questionId, { content: answerContent });
      const response = await fetchQuestions();
      if (Array.isArray(response.data)) {
        setQuestions(response.data);
      } else {
        setQuestions([response.data]);
      }
      setSelectedQuestionId(null);
      setAnswerText('');
    } catch (error) {
      console.error('Error adding answer:', error);
      setError('Error adding answer');
    }
  };

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
        Ask a Question
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, mb: 3, borderRadius: 2 }}>
        <TextField
          label="Question Title"
          fullWidth
          margin="normal"
          value={newQuestionTitle}
          onChange={(e) => setNewQuestionTitle(e.target.value)}
        />
        <TextField
          label="Question Content"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={newQuestionContent}
          onChange={(e) => setNewQuestionContent(e.target.value)}
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ bgcolor: orange[500], color: 'white', '&:hover': { bgcolor: orange[700] } }} onClick={handleCreateQuestion}>
            Ask Question
          </Button>
        </Box>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Questions
      </Typography>
      <List>
        {questions.map((item, index) => (
          <React.Fragment key={item._id || index}>
            <QuestionPaper>
              <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h6" gutterBottom>
                  {item.title || "No Title"}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  Asked by: {item.author?.username || item.author || "Anonymous"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {item.content || "No Content"}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: orange[500],
                      color: 'white',
                      '&:hover': {
                        bgcolor: orange[700],
                      },
                    }}
                    onClick={() => handleAnswerClick(item._id)}
                  >
                    Answer
                  </Button>
                </Box>
              </ListItem>
              {item.answers && item.answers.map(answer => (
                <AnswerBox key={answer._id}>
                  <Typography variant="body2">{answer.content}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Answered by: {answer.author?.username || answer.author || "Anonymous"}
                  </Typography>
                </AnswerBox>
              ))}
              {selectedQuestionId === item._id && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Your Answer"
                    fullWidth
                    multiline
                    rows={3}
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: orange[500],
                      color: 'white',
                      '&:hover': {
                        bgcolor: orange[700],
                      },
                    }}
                    onClick={() => handleAnswerSubmit(item._id , answerText)}
                  >
                    Answer
                  </Button>
                </Box>
              )}
            </QuestionPaper>
            {index < questions.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
      {questions.length === 0 && !loading && !error && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No questions have been asked yet.
        </Typography>
      )}
    </Container>
  );
};

export default Ask;
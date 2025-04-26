import express from 'express';
const routerAsk = express.Router();
import Question from '../models/Question.js';
import Answer from '../models/Answer.js';
import authMiddleware from '../middleware/authmiddleware.js';

routerAsk.get('/', async (req, res) => {
    try {
      const questions = await Question.find()
        .populate('author', 'username')
        .populate({
          path: 'answers',
          populate: {
            path: 'author',
            select: 'username'
          }
        });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error when getting questions', error });
    }
  });

routerAsk.post('/', authMiddleware, async (req, res) => {
    try {
      const { title, content } = req.body;
      const newQuestion = new Question({
        title,
        content,
        author: req.user._id,
      });
      const savedQuestion = await newQuestion.save();
      res.status(201).json(savedQuestion);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error when creating question', errors: error.errors });
      }
      res.status(400).json({ message: 'Error creating question', error });
    }
  });

  routerAsk.post('/:questionId/answer', authMiddleware, async (req, res) => {
    try {
      const { content } = req.body;
      const question = await Question.findById(req.params.questionId);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      const newAnswer = new Answer({
        questionId: req.params.questionId,
        content,
        author: req.user._id,
      });
      const savedAnswer = await newAnswer.save();
      question.answers.push(savedAnswer._id);
      await question.save();
      res.status(201).json(savedAnswer);
    } catch (error) {
      res.status(400).json({ message: 'Error when adding answer', error });
    }
  });

export default routerAsk;
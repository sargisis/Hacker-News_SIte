import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import registerValidation from './middleware/validator.js';
import { register, login } from './authorization/auth.js';

import postsRoutes from './routes/PostsRouter.js';
import CommentRouter from './routes/CommentRouter.js';
import NewsestRouter from './routes/NewsestRouter.js';
import routerFront from './routes/FrontNewsRouter.js';
import NewComment from './routes/NewComment.js';
import routerAsk from './routes/AskRouter.js';
import Showrouter from './routes/ShowRouter.js';

mongoose.connect(
  "mongodb+srv://abgaryansargis09:1JPDSX5HuarOI8N0@cluster0.uebidsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const app = express();
const PORT = 3000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.post('/register', registerValidation, register);
app.post('/login', login);

app.use('/posts', postsRoutes);
app.use('/comments', CommentRouter);
app.use('/newsest', NewsestRouter);
app.use('/front', routerFront);
app.use('/comment', NewComment);
app.use('/ask', routerAsk);
app.use('/show', Showrouter);


app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});
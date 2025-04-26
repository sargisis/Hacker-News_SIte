
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
});

export default mongoose.model('Question', QuestionSchema);
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: {type: Date , default: Date.now()},
});

export default mongoose.model('Comment', CommentSchema);
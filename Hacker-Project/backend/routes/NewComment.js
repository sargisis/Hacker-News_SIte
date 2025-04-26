import express from "express";
import Comments from "../models/Comments.js";

const NewComment = express.Router();

NewComment.get('/newest', async (req, res) => {
    try {
        const newestComments = await Comments.find().sort({ createdAt: -1 });
        res.status(200).json(newestComments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching latest comments", error });
    }
});

NewComment.post('/', (req, res) => {
    const { title, content, author, date } = req.body;
    if (!title || !content || !author || !date) {
        return res.status(400).json({ message: "Title, content, author, and date are required" });
    }
    const newCommentSchema = new Comments({
        title: title,
        content: content,
        author: author,
        date: date,
    });

    newCommentSchema.save()
        .then(() => {
            res.status(200).json({ message: "Comment created successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error creating comment", error });
        });
});

export default NewComment;
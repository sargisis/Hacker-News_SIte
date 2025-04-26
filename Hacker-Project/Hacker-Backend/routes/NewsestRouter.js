import express from "express";
import Posts from "../models/Posts.js";

const NewsestRouter = express.Router();


NewsestRouter.post('/newsest' , (req , res) => {
    const {title , content ,authorId} = req.body; 
    if (!title || !content)
    {
        res.status(500).json({message: "Title and Content"})
    }  

    const newPostSchema = new Posts({
        title: title,
        content: content,
        authorId: authorId
    })

    newPostSchema.save()
    .then(() => {
        res.status(200).json({message: "Success"})
    })
    .catch((error) => {
        res.status(500).json({message: "Error" , error})
    })
})

NewsestRouter.get('/' , async (req, res) => {
    try {
       const allPosts = await Posts.find().sort({ createdAt: -1 }).populate('authorId', 'username');
       res.status(200).json(allPosts)
    }catch(error)
    {
        res.status(500).json({message: "Error Get Posts"})
    }
})

export default NewsestRouter;

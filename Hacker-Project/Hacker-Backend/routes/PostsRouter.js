import express from "express";
import Posts from "../models/Posts.js";
import authMiddleware from "../middleware/authmiddleware.js"

const postsRoutes = express.Router();

postsRoutes.post('/submit' , authMiddleware , (req, res) => {
    const {title , content } = req.body;
    if (!title || !content)
    {
        res.status(400).json({message: "Title and content are required"})
    }
    const newPost = new Posts({
        title: title,
        content: content,
        authorId: req.user._id
    })
    newPost.save()
    .then(() => {
        res.status(200).json({message: "Posts created success"})
    })
    .catch((error) => {
        res.status(500).json({message: "Error Creataing Post" ,error});
    })
})

postsRoutes.get('/', async (req, res) => {
    try {
        const allPosts = await Posts.find().sort({ createdAt: -1 }).populate('authorId', 'username');
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
});

postsRoutes.get('/:id', async (req, res) => {
    try {
      const postId = req.params.id;

      const post = await Posts.findById(postId).populate('authorId', 'username');
      console.log('Found Post:', post);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Post not found (invalid ID)' });
      }
      res.status(500).json({ message: 'Error fetching post', error });
    }
});

export default postsRoutes; 
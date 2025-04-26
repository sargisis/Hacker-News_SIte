import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (formData) => API.post('/register', formData);
export const loginUser = (formData) => API.post('/login', formData);
export const fetchPosts = () => API.get('/posts');
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (postData) => API.post('/posts/submit', postData);
export const upvotePost = (id) => API.post(`/posts/${id}/upvote`);
export const createJob = (jobData) => API.post('/show/submit-job', jobData);
export const fetchJobs = () => API.get('/show/jobs');
export const fetchJobById = (jobId) => API.get(`/show/job/${jobId}`);
export const fetchCommentsByPostId = (postId) => API.get(`/comments/posts/${postId}/comments`);
export const fetchComments = (postId) => API.get(`/comments/posts/${postId}/comments`);
export const createComment = (postId, commentData) => API.post(`/comments/posts/${postId}/comments`, commentData);
export const submitReply = (parentCommentId, replyData) => API.post(`/comments/${parentCommentId}/replies`, replyData);
export const fetchRepliesByCommentId = (parentId) => API.get(`/comments/${parentId}/replies`);
export const fetchNewest = () => API.get('/newsest');
export const fetchFront = () => API.get('/front');
export const fetchShow = () => API.get('/show');
export const fetchCommentsPage = () => API.get('/comments');
export const NewCommentFetch = () => API.get('/comment/newest');
export const fetchQuestions = () => API.get('/ask');
export const createQuestion = (questionData) => API.post('/ask', questionData);
export const addAnswer = (questionId, answerData) => API.post(`/ask/${questionId}/answer`, answerData);
export const fetchNews = () => API.get('/posts');
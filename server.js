const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Blog = require('./models/Blog'); // Adjust the path as per your actual file structure
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes

// Create a new blog post
app.post('/api/blog', async (req, res) => {
  const { title, content, author } = req.body;
  const newBlog = new Blog({ title, content, author, date: new Date() });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all blog posts
app.get('/api/blog', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a blog post
app.put('/api/blog/:id', async (req, res) => {
  const { title, content, author } = req.body;
  const { id } = req.params;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, author }, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog post
app.delete('/api/blog/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndDelete(id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Listen on port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

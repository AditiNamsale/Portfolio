import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from './BlogList';
import AdminPanel from './AdminPanel';
import Login from '../Login/Login';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog'); // Ensure this URL is correct
        console.log('Fetched blogs:', response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      {isAdmin ? <AdminPanel setBlogs={setBlogs} /> : <Login setIsAdmin={setIsAdmin} />}
      <br /><br /><h2 className="text-center">Blog Posts</h2>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import AdminBlogList from './AdminBlogList';

const AdminPanel = ({ setBlogsProp }) => { // Renamed prop to setBlogsProp
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const createOrEditBlogPost = async () => {
    if (!title || !content || !author) {
      alert('All fields are required.');
      return;
    }

    try {
      if (isEditing && editId) {
        const response = await axios.put(`http://localhost:5000/api/blog/${editId}`, { title, content, author });
        setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === editId ? response.data : blog));
        setIsEditing(false);
        setEditId(null);
      } else {
        const response = await axios.post('http://localhost:5000/api/blog', { title, content, author });
        setBlogs(prevBlogs => [...prevBlogs, response.data]);
      }

      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Error creating/editing blog post:', error);
      alert('An error occurred while creating/editing the blog post. Please try again.');
    }
  };

  const startEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
    setIsEditing(true);
    setEditId(blog._id);
  };

  const cancelEdit = () => {
    setTitle('');
    setContent('');
    setAuthor('');
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      ></textarea>
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <br /><br />
      <button onClick={createOrEditBlogPost}>{isEditing ? 'Edit Post' : 'Create Post'}</button>
      {isEditing && <button onClick={cancelEdit}>Cancel Edit</button>}
      <AdminBlogList blogs={blogs} setBlogs={setBlogs} startEdit={startEdit} />
    </div>
  );
};

export default AdminPanel;
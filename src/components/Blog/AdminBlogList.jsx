import React from 'react';
import axios from 'axios';

const AdminBlogList = ({ blogs, setBlogs, startEdit }) => {
  const deleteBlogPost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/${id}`);
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('An error occurred while deleting the blog post. Please try again.');
    }
  };

  return (
    <div className="admin-blog-list">
      <h3>Manage Blog Posts</h3>
      {blogs.map(blog => (
        <div key={blog._id} className="blog-item">
          <h4>{blog.title}</h4>
          <p>{blog.content}</p>
          <p><strong>Author:</strong> {blog.author}</p>
          <button onClick={() => startEdit(blog)}>Edit</button>
          <button onClick={() => deleteBlogPost(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminBlogList;
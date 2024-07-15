import React from 'react';
import './BlogList.css';

const BlogList = ({ blogs }) => {
  console.log('Rendering blogs:', blogs);

  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div key={blog._id} className="blog-card">
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <small>By {blog.author} on {new Date(blog.date).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

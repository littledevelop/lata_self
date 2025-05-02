import React from 'react';
import { useParams } from 'react-router-dom';

const blogPosts = [
  {
    id: 'react-hooks',
    title: 'Understanding React Hooks',
    content: 'React Hooks are functions that let you use state and other React features in functional components. They simplify state management and side effects in React applications.',
    image: 'images/reacthook.jpeg',
  },
  {
    id: 'ant-design',
    title: 'Getting Started with Ant Design',
    content: 'Ant Design is a popular React UI library that provides a set of high-quality components for building beautiful and responsive user interfaces.',
    image: 'images/antdesign.jpeg',
   
  },
  {
    id: 'javascript-es6',
    title: 'Mastering JavaScript ES6+ Features',
    content: 'JavaScript ES6 introduced several new features like arrow functions, destructuring, template literals, and more, which make coding more efficient and readable.',
    image: 'images/javascriptes6.jpeg',
  },
];

const BlogPost = () => {
  const { id } = useParams(); // Get the blog post ID from the URL
  const post = blogPosts.find((post) => post.id === id); // Find the blog post by ID

  if (!post) {
    return <h1>404 - Blog Post Not Found</h1>; // Handle invalid IDs
  }

  return (
    <div className="blog-page">
      {/* You can add a back button or navigation here */}
      <button onClick={() => window.history.back()} style={{ marginBottom: '20px' }}>
        Back to Blog
      </button>
      {/* Display the blog post content */}
      <h1 className="blog-post-title">{post.title}</h1>
      <p className="blog-post-content">{post.content}</p>
      {/* Display the image if it exists */}
      {post.image && <img src={`${process.env.PUBLIC_URL}/${post.image}`} alt={post.title} style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />}
      {/* You can also add more content or styling here */}
      <p className="blog-post-content">{post.content}</p>
    </div>
    
  );
};

export default BlogPost;
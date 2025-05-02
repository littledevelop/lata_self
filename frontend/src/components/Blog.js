import React from 'react';
import { Card, Row, Col } from 'antd';
import '../common.css';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 'react-hooks',
      title: 'Understanding React Hooks',
      content: 'React Hooks are functions that let you use state and other React features in functional components. They simplify state management and side effects in React applications.',
      image: 'images/reacthook.jpeg',
      link: '/blog/react-hooks',
    },
    {
      id: 'ant-design',
      title: 'Getting Started with Ant Design',
      content: 'Ant Design is a popular React UI library that provides a set of high-quality components for building beautiful and responsive user interfaces.',
      image: 'images/antdesign.jpeg',
      link: '/blog/ant-design',
    },
    {
      id: 'javascript-es6',
      title: 'Mastering JavaScript ES6+ Features',
      content: 'JavaScript ES6 introduced several new features like arrow functions, destructuring, template literals, and more, which make coding more efficient and readable.',
      image: 'images/javascriptes6.jpeg',
      link: '/blog/javascript-es6',
    },
  ];

    return (
      <div className="blog-page">
        <h1 className="blog-title">My Blog</h1>
        <Row gutter={[16, 16]}>
          {blogPosts.map((post) => (
            <Col xs={24} sm={12} md={8} key={post.id}>
              <Card
                hoverable
                cover={<img alt={post.title} src={post.image} />}
                className="blog-card"
              >
                <Card.Meta
                  title={post.title}
                  description={post.content}
                />
                <Link to={post.link} className="read-more">
                  Read More →
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };


export default Blog;

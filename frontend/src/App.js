import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const Contact = React.lazy(() => import('./components/Contact'));
const Blog = React.lazy(() => import('./components/Blog'));
const BlogPost = React.lazy(() => import('./components/BlogPost')); // New Component
const Navbar = React.lazy(() => import('./components/Navbar'));

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Default Route */}
            <Route path="/home" element={<Home />} /> {/* Add this route */}
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} /> {/* Dynamic Route */}
            <Route path="*" element={<div>404 Not Found</div>} /> {/* Catch-all Route */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import '../common.css';
import axios from 'axios';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
      const [status, setStatus] = useState('');
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
    
        try {
          const response = await axios.post('http://localhost:5000/api/contact', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
          if (response.status === 200) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
          } else {
            setStatus('error');
          }
        } catch (error) {
          console.error('Error:', error.response || error);
          setStatus('error');
        }
      };
    
      return (
        <section id="contact" className="contact-section">
          <div className="contact-page">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <p>+919638598860</p>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <p>latarana4u@gmail.com</p>
              </div>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>Surat, India</p>
              </div>
              <div className="social-links">
                <a href="https://linkedin.com/in/lata-chapadia" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/latachapadia" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
    
            <div className="contact-form">
              <h2>Send me a message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && (
                  <p className="success-message">Message sent successfully!</p>
                )}
                {status === 'error' && (
                  <p className="error-message">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </section>
  );
}

export default Contact;

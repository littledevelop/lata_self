import React from 'react';
import '../common.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <h2>About Me</h2>
        <div className="about-content">
          <p>
            I am a passionate Software Engineer based in Surat, India, with over 2 years of experience in web development.
            I specialize in creating efficient and user-friendly web applications using modern technologies.
            My expertise lies in both frontend and backend development, with a strong focus on PHP, Laravel, and React.
          </p>
        </div>
      </section>

      <section className="education-section">
        <h2>Education</h2>
        <div className="education-card">
          <h3>Bachelor's in Computer Application</h3>
          <p className="institution">Udhna academy college of computer application and Information Technology</p>
          <p className="period">2010-2013</p>
          <p className="location">Surat</p>
        </div>
      </section>

      <section className="languages-section">
        <h2>Languages</h2>
        <div className="languages-grid">
          <div className="language-card">
            <h3>English</h3>
            <p>Fluent</p>
          </div>
          <div className="language-card">
            <h3>Hindi</h3>
            <p>Fluent</p>
          </div>
          <div className="language-card">
            <h3>Gujarati</h3>
            <p>Mother Tongue</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
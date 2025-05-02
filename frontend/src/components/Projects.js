import React from 'react';
import '../common.css';

const Projects = () => {
  const projects = [
    {
      title: "Vani SoftTech (GST Billing Software)",
      description: [
        "Developed a GST billing software allowing users to generate, print, and save bills in PDF format.",
        "Stored customer details, item details, and transaction history securely."
      ],
      technologies: ["Excel", "Vlookup"]
    },
    {
      title: "Expert QA",
      description: [
        "Created a question-answer website for users to ask and respond to expert queries.",
        "Implemented an admin panel for managing users and content.",
        "Designed with a secure backend to store and retrieve data efficiently."
      ],
      technologies: ["PHP", "MySQL"]
    },
    {
      title: "E-commerce Website",
      description: [
        "Built a fully functional e-commerce website using PHP, Bootstrap, CSS, Ajax, and jQuery.",
        "Integrated a payment gateway for seamless transactions.",
        "Designed for an intuitive user experience and efficient order processing."
      ],
      technologies: ["PHP", "Bootstrap", "MySQL", "Ajax","jQuery","javascript","CSS","HTML"]
    },
    {
      title: "Photography Website",
      description: [
        "Developed a photography portfolio website using Laravel.",
        "Implemented gallery, slider, and admin-controlled features.",
        "Integrated Facebook API and Google Maps API for enhanced user interaction."
      ],
      technologies: ["Laravel", "JavaScript", "APIs"]
    }
  ];

  const workExperience = [
    {
      company: "Yanolja Cloud Solution (formaly known as eZee technosys)",
      position: "Associate Software Engineer",
      period: "2021 - PRESENT",
      responsibilities: [
        "Developed and maintained web applications using PHP and React.",
        "Worked on MySQL database optimization for efficient data handling.",
        "Designed and implemented API integrations to improve functionality.",
        "Collaborated with a team to develop scalable software solutions."
      ]
    },
    {
      company: "Webmaster Infotech | Surat",
      position: "Intern",
      period: "2021-2022",
      responsibilities: [
        "Designed and developed an e-commerce website using PHP and Laravel.",
        "Built a property gallery website using Laravel with advanced search features.",
        "Enhanced technical skills and gained hands-on experience in web development."
      ]
    }
  ];

  return (
    <div className="projects-page">
      <section className="work-experience">
        <h2>Work Experience</h2>
        {workExperience.map((job, index) => (
          <div key={index} className="experience-card">
            <h3>{job.company}</h3>
            <h4>{job.position}</h4>
            <p className="period">{job.period}</p>
            <ul>
              {job.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="projects-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <ul>
                {project.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className="technologies">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects; 
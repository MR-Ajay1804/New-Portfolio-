import React from "react";
import { createRoot } from "react-dom/client";
import profileImage from "./assets/profile.jpg";
import resumePdf from "./assets/Ajay Kumar Saini.pdf";
import "./styles/resume.css";

const links = {
  portfolio: "/",
  livePortfolio: "https://ajay-protfolio.netlify.app/",
  github: "https://github.com/MR-Ajay1804",
  linkedin: "https://www.linkedin.com/in/ajay1804/",
  instagram: "https://www.instagram.com/the.xajju/",
  email: "mailto:ajay.techjourney@gmail.com",
  phone: "tel:+917878286373",
  resume: resumePdf
};

const projects = [
  {
    name: "Task Manager",
    type: "Productivity Web App",
    summary: "Responsive task workflow app for creating, organizing, and tracking daily work.",
    stack: ["React", "JavaScript", "Vercel"],
    demo: "https://task-manager-psi-sooty.vercel.app/",
    repo: "https://github.com/MR-Ajay1804/task-manager.git"
  },
  {
    name: "CSV Dashboard",
    type: "Data Visualization",
    summary: "Interactive CSV dashboard for charts, filters, and readable data summaries.",
    stack: ["JavaScript", "Charts", "Dashboard"],
    demo: "https://csv-dashboard-tau.vercel.app/",
    repo: "https://github.com/MR-Ajay1804/CSV-Dashboard.git"
  },
  {
    name: "Library Management System",
    type: "Full Stack Web App",
    summary: "Library operations system for managing books, records, and admin workflows.",
    stack: ["Node.js", "JavaScript", "Render"],
    demo: "https://library-management-system-rfeo.onrender.com/",
    repo: "https://github.com/MR-Ajay1804/library-management-system.git"
  },
  {
    name: "Sign Language Detection",
    type: "Computer Vision",
    summary: "Python computer vision project for recognizing hand gestures and sign output.",
    stack: ["Python", "OpenCV", "AI"],
    repo: "https://github.com/MR-Ajay1804/Sign-language-Detection-.git"
  }
];

const skills = [
  "JavaScript",
  "React.js",
  "HTML",
  "CSS",
  "Node.js",
  "Python",
  "OpenCV",
  "Firebase",
  "MySQL",
  "C++",
  "DSA",
  "GitHub",
  "Vercel",
  "Render",
  "Netlify",
  "ChatGPT",
  "Gemini",
  "Claude",
  "Codex"
];

const Icon = ({ children }) => <span className="resume-icon">{children}</span>;

function ResumePage() {
  return (
    <main className="resume-shell">
      <div className="resume-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <nav className="resume-nav" aria-label="Resume actions">
        <a href={links.portfolio}>Portfolio</a>
        <a href={links.resume} target="_blank" rel="noopener noreferrer">Download PDF</a>
        <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>

      <section className="resume-hero">
        <div className="identity-card reveal">
          <img src={profileImage} alt="Ajay Kumar Saini" />
          <div>
            <p className="eyebrow">Professional Resume</p>
            <h1>Ajay Kumar Saini</h1>
            <p className="headline">Full Stack Developer | AI Tools Power User | CSE Student</p>
            <div className="contact-line">
              <a href={links.email}>ajay.techjourney@gmail.com</a>
              <span>Alwar, Rajasthan</span>
              <a href={links.phone}>+91 78782 86373</a>
            </div>
          </div>
        </div>

        <div className="summary-card reveal delay-1">
          <p>
            Computer Science Engineering student focused on building practical full stack web apps,
            AI-assisted workflows, and computer vision projects. Comfortable taking ideas from concept
            to responsive UI, backend connectivity, deployment, and presentation.
          </p>
          <div className="hero-actions">
            <a href={links.resume} target="_blank" rel="noopener noreferrer">Download Resume</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </section>

      <section className="resume-grid">
        <article className="resume-panel reveal delay-2">
          <Icon>01</Icon>
          <h2>Core Profile</h2>
          <ul>
            <li>Full stack web development with React, JavaScript, APIs, Firebase, and MySQL fundamentals.</li>
            <li>AI workflow experience using ChatGPT, Gemini, Claude, Claude Code, Codex, and Nano Banana.</li>
            <li>Project deployment experience across Vercel, Render, Netlify, and GitHub.</li>
          </ul>
        </article>

        <article className="resume-panel reveal delay-3">
          <Icon>02</Icon>
          <h2>Education</h2>
          <div className="timeline">
            <div>
              <span>2022 - 2026</span>
              <strong>B.Tech in Computer Science and Engineering</strong>
              <p>Modern Institute of Technology and Research Centre, Alwar, Rajasthan.</p>
            </div>
            <div>
              <span>2022</span>
              <strong>12th - Science (PCM)</strong>
              <p>Adinath Public School, Alwar, Rajasthan.</p>
            </div>
            <div>
              <span>2020</span>
              <strong>10th</strong>
              <p>Adinath Public School, Alwar, Rajasthan.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="resume-panel wide reveal">
        <div className="section-title">
          <Icon>03</Icon>
          <h2>Experience</h2>
        </div>
        <div className="experience-list">
          <div>
            <span>Jul - Aug 2025</span>
            <h3>Full Stack Web Developer Intern - Upflairs, Jaipur</h3>
            <p>Developed responsive web applications with HTML, CSS, JavaScript, and React; integrated APIs and backend connectivity; collaborated using Git and GitHub.</p>
          </div>
          <div>
            <span>Apr - May 2025</span>
            <h3>Intern - Supreme Cooling Systems, Khushkhera</h3>
            <p>Created and edited technical drawings using AutoCAD and supported digital documentation of industrial systems and processes.</p>
          </div>
        </div>
      </section>

      <section className="resume-panel wide reveal">
        <div className="section-title">
          <Icon>04</Icon>
          <h2>Featured Projects</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.name}>
              <div>
                <span>{project.type}</span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="stack">
                  {project.stack.map((item) => <b key={item}>{item}</b>)}
                </div>
              </div>
              <div className="project-actions">
                {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo</a>}
                <a href={project.repo} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-panel wide reveal">
        <div className="section-title">
          <Icon>05</Icon>
          <h2>Skills</h2>
        </div>
        <div className="skill-cloud">
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("resume-root")).render(
  <React.StrictMode>
    <ResumePage />
  </React.StrictMode>
);

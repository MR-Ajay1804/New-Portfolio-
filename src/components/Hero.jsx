import React from "react";

export default function Hero({ links, helpers }) {
  const { Icon } = helpers;

  return (
    <section className="hero">
      <div>
        <div className="kicker" data-reveal>
          <span className="kicker-pulse" />
          <span className="kicker-text">Full Stack Developer + AI Engineer</span>
        </div>

        <h1 data-reveal>
          Ajay Kumar Saini
          <span className="name">
            Crafting Scalable Web Applications & AI-Powered Systems.
          </span>
        </h1>

        <p className="lead" data-reveal>
          Computer Science Engineering professional specializing in full-stack architecture, React ecosystems, OpenCV computer vision models, and production web applications. Focused on engineering high-performance digital products with clean code, intuitive UX, and measurable impact.
        </p>

        <div className="hero-actions" data-reveal>
          <a className="primary" href="#projects">
            <Icon name="external" />
            View Production Projects
          </a>

          <a
            className="secondary"
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="award" />
            Download Resume
          </a>

          <a className="secondary" href="#contact">
            <Icon name="mail" />
            Get In Touch
          </a>
        </div>

        <div className="stats" data-reveal>
          <div className="stat">
            <strong>6+</strong>
            <span>Deployed Projects</span>
          </div>

          <div className="stat">
            <strong>Full Stack</strong>
            <span>React · Node · Python · SQL</span>
          </div>

          <div className="stat">
            <strong>2026</strong>
            <span>B.Tech CSE Graduation</span>
          </div>
        </div>
      </div>

      <div className="visual" data-reveal>
        <div
          className="photo-stage"
          aria-label="Ajay Kumar Saini profile photo"
        >
          <div className="photo-card">
            <div className="photo-slot">
              <img
                src={links.profile}
                alt="Ajay Kumar Saini - Full Stack Developer and AI Engineer"
              />
            </div>
          </div>
        </div>

        <div className="floating-chip chip-one">
          <Icon name="sparkle" />
          Computer Vision & ML
        </div>

        <div className="floating-chip chip-two">
          <Icon name="code" />
          Full Stack Architecture
        </div>
      </div>
    </section>
  );
}
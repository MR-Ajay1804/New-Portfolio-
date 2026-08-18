import React from "react";

export default function Hero({ links, helpers }) {
  const { Icon } = helpers;

  return (
    <section className="hero">
      <div>
        <div className="kicker" data-reveal>
          <Icon name="layers" />
          Full Stack Developer + AI Engineer
        </div>

        <h1 data-reveal>
          Ajay Kumar Saini{" "}
          <span className="name">
            Full Stack Developer & AI Engineer.
          </span>
        </h1>

        <p className="lead" data-reveal>
          Computer Science Engineering professional from Alwar, Rajasthan,
          focused on full stack development, React.js, AI projects, computer
          vision, and practical web applications. I also work with AI tools,
          digital marketing, and SEO to build and improve modern digital
          experiences.
        </p>

        <div className="hero-actions" data-reveal>
          <a className="primary" href="#projects">
            <Icon name="external" />
            View Projects
          </a>

          <a
            className="secondary"
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="award" />
            Resume
          </a>

          <a className="secondary" href="#contact">
            <Icon name="mail" />
            Contact Me
          </a>
        </div>

        <div className="stats" data-reveal>
          <div className="stat">
            <strong>6+</strong>
            <span>Featured projects</span>
          </div>

          <div className="stat">
            <strong>AI</strong>
            <span>Efficient workflow</span>
          </div>

          <div className="stat">
            <strong>2026</strong>
            <span>B.Tech graduation</span>
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
          AI Workflow
        </div>

        <div className="floating-chip chip-two">
          <span className="chip-emoji" aria-hidden="true">
            ⚡
          </span>
          Fast Performance
        </div>

        <div className="floating-chip chip-three">
          <Icon name="sparkle" />
          Problem Solver
        </div>
      </div>
    </section>
  );
}
import React from "react";

export default function About({ about, helpers }) {
  const { IconBox, Tags, SectionHead } = helpers;

  return (
    <section id="about">
      <SectionHead title="About">
        Ajay Kumar Saini — Full Stack Developer, AI Engineer, and Computer Science Engineer from Alwar, Rajasthan.
      </SectionHead>

      <div className="about-layout">
        <article className="about-copy" data-reveal>
          <span className="project-type">
            Full Stack Developer + AI Workflow Builder
          </span>

          <h3>
            I build modern web applications using React, AI tools, and
            practical development workflows.
          </h3>

          <p>{about.intro}</p>

          <Tags items={about.focus} />
        </article>

        <div className="about-cards">
          {about.cards.map((item) => (
            <article
              className="panel about-card"
              data-reveal
              key={item.title}
            >
              <IconBox name={item.icon} tone={item.tone} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
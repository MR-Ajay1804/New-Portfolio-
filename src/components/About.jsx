import React from "react";

export default function About({ about, helpers }) {
  const { IconBox, Tags, SectionHead } = helpers;

  return (
    <section id="about">
      <SectionHead title="About">Full stack development, AI-powered workflow, and practical project delivery.</SectionHead>
      <div className="about-layout">
        <article className="about-copy" data-reveal>
          <span className="project-type">Full Stack Developer + AI Workflow Builder</span>
          <h3>I build useful apps faster by combining code, AI tools, and deployment skills.</h3>
          <p>{about.intro}</p>
          <Tags items={about.focus} />
        </article>
        <div className="about-cards">
          {about.cards.map((item) => (
            <article className="panel about-card" data-reveal key={item.title}>
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

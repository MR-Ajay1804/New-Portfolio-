import React from "react";
export default function Skills({ skills, helpers }) {
  const { IconBox, Tags, SectionHead } = helpers;

  return (
    <section id="skills">
      <SectionHead title="Skills">Full stack engineering, AI tools, deployment platforms, and computer vision fundamentals.</SectionHead>
      <div className="grid three">
        {skills.map((skill) => (
          <article className="panel" data-reveal key={skill.title}>
            <IconBox name={skill.icon} tone={skill.tone} />
            <h3>{skill.title}</h3>
            <p>{skill.text}</p>
            <Tags items={skill.tags} />
          </article>
        ))}
      </div>
    </section>
  );
}

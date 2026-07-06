import React from "react";
export default function Experience({ experiences, helpers }) {
  const { IconBox, Tags, ActionLink, SectionHead } = helpers;

  return (
    <section id="experience">
      <SectionHead title="Experience">Industrial and full-stack internship experience from Ajay&apos;s resume.</SectionHead>
      <div className="grid two">
        {experiences.map((item) => (
          <article className="panel" data-reveal key={item.title}>
            <IconBox name={item.icon} tone={item.tone} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Tags items={item.tags} />
            <div className="action-row"><ActionLink {...item.action} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}

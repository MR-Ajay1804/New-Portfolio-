import React from "react";
export default function Education({ education, helpers }) {
  const { IconBox, SectionHead } = helpers;

  return (
    <section id="education">
      <SectionHead title="Education">Academic background from Ajay&apos;s resume.</SectionHead>
      <div className="timeline">
        {education.map((item) => (
          <article className="timeline-item" data-reveal key={item.title}>
            <div className="time">{item.time}</div>
            <div>
              <IconBox name={item.icon} tone={item.tone} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import React from "react";
export default function Extras({ extras, helpers }) {
  const { IconBox, SectionHead } = helpers;

  return (
    <section id="extras">
      <SectionHead title="Beyond Code">Creative and extracurricular strengths that add personality to Ajay&apos;s engineering profile.</SectionHead>
      <div className="grid three">
        {extras.map((item) => (
          <article className="panel" data-reveal key={item.title}>
            <IconBox name={item.icon} tone={item.tone} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

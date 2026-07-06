import React from "react";
export default function Certificates({ certificates, helpers }) {
  const { IconBox, SectionHead } = helpers;

  return (
    <section id="certificates">
      <SectionHead title="Certificates">Resume, certificates, internship documents, and research paper links.</SectionHead>
      <div className="cert-list">
        {certificates.map((cert) => (
          <a className="cert" data-reveal href={cert.href} target="_blank" rel="noopener noreferrer" key={cert.label}>
            <IconBox name={cert.icon} tone={cert.tone} />
            {cert.label}
          </a>
        ))}
      </div>
    </section>
  );
}

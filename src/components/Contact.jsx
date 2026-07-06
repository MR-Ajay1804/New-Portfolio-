import React from "react";
export default function Contact({ links, helpers }) {
  const { Icon, IconBox, SectionHead } = helpers;
  const contactLinks = [
    { href: links.email, icon: "mail", label: "ajay.techjourney@gmail.com" },
    { href: links.phone, icon: "phone", label: "+91 78782 86373" },
    { href: links.resume, icon: "award", label: "Download Resume" },
    { href: links.portfolio, icon: "external", label: "ajay-protfolio.netlify.app" },
    { href: links.github, icon: "github", label: "github.com/MR-Ajay1804" },
    { href: links.linkedin, icon: "linkedin", label: "linkedin.com/in/ajay1804" },
    { href: links.instagram, icon: "instagram", label: "instagram.com/the.xajju" }
  ];

  return (
    <section id="contact">
      <SectionHead title="Contact" />
      <div className="contact">
        <div className="contact-box" data-reveal>
          <IconBox name="mail" tone="mint" />
          <h3>Let&apos;s build something useful.</h3>
          <p className="lead">Ajay is based in Alwar, Rajasthan and is looking for Full Stack Developer, frontend, backend, and AI-related software opportunities.</p>
          <div className="contact-pills" aria-label="Availability">
            <span>Full Stack Developer</span>
            <span>AI Tool Power User</span>
            <span>Open to internships & roles</span>
          </div>
          <div className="contact-links">
            {contactLinks.map((item) => (
              <a href={item.href} key={item.label} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                <Icon name={item.icon} />
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="contact-box" data-reveal>
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden-field">
              <label>Don&apos;t fill this out: <input name="bot-field" /></label>
            </p>
            <input name="name" aria-label="Name" placeholder="Name" required />
            <input name="email" type="email" aria-label="Email" placeholder="Email" required />
            <textarea name="message" aria-label="Message" placeholder="Message" required />
            <button className="primary" type="submit"><Icon name="send" />Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

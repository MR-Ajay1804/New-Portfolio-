```jsx
import React, { useState } from "react";

export default function Contact({ links, helpers }) {
  const { Icon, IconBox, SectionHead } = helpers;

  const [status, setStatus] = useState("");

  const contactLinks = [
    { href: links.email, icon: "mail", label: "ajay.techjourney@gmail.com" },
    { href: links.phone, icon: "phone", label: "+91 78782 86373" },
    { href: links.resume, icon: "award", label: "Download Resume" },
    {
      href: links.portfolio,
      icon: "external",
      label: "ajay-protfolio.netlify.app",
    },
    {
      href: links.github,
      icon: "github",
      label: "github.com/MR-Ajay1804",
    },
    {
      href: links.linkedin,
      icon: "linkedin",
      label: "linkedin.com/in/ajay1804",
    },
    {
      href: links.instagram,
      icon: "instagram",
      label: "instagram.com/the.xajju",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    const form = e.target;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      form.reset();
      setStatus("Message sent successfully! 🎉");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact">
      Get in touch with Ajay Kumar Saini for Full Stack Development, AI, web
      development, and digital marketing opportunities.

      <SectionHead title="Contact" />

      <div className="contact">
        <div className="contact-box" data-reveal>
          <IconBox name="mail" tone="mint" />

          <h3>Let&apos;s build something useful.</h3>

          <p className="lead">
            Ajay is based in Alwar, Rajasthan and is looking for Full Stack
            Developer, frontend, backend, and AI-related software opportunities.
          </p>

          <div className="contact-pills" aria-label="Availability">
            <span>Full Stack Developer</span>
            <span>AI Tool Power User</span>
            <span>Open to internships & roles</span>
          </div>

          <div className="contact-links">
            {contactLinks.map((item) => (
              <a
                href={item.href}
                key={item.label}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <Icon name={item.icon} />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="contact-box" data-reveal>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />

            <p className="hidden-field">
              <label>
                Don&apos;t fill this out:
                <input name="bot-field" />
              </label>
            </p>

            <label className="field">
              <span>Your name</span>
              <input
                name="name"
                placeholder="Enter your full name"
                required
              />
            </label>

            <label className="field">
              <span>Your email</span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
              />
            </label>

            <label className="field">
              <span>Your message</span>
              <textarea
                name="message"
                placeholder="Write your message, project idea, or opportunity here..."
                required
              />
            </label>

            <button className="primary" type="submit">
              <Icon name="send" />
              Send Message
            </button>

            {status && (
              <p className="form-status" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
```

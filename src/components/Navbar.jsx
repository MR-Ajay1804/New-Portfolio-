import React from "react";
export default function Navbar({ helpers }) {
  const { Icon } = helpers;
  const navItems = [
    ["about", "About", "sparkle"],
    ["skills", "Skills", "code"],
    ["education", "Education", "school"],
    ["experience", "Experience", "briefcase"],
    ["projects", "Projects", "code"],
    ["certificates", "Certificates", "award"],
    ["extras", "Beyond Code", "sparkle"],
    ["contact", "Contact", "phone"]
  ];

  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Go to home">
        <span className="brand-mark"><Icon name="layers" /></span>
        <span>Ajay Kumar Saini</span>
      </a>
      <nav className="nav" aria-label="Portfolio sections">
        {navItems.map(([id, label, icon]) => (
          <a href={`#${id}`} title={label} key={id}>
            <Icon name={icon} />
            <span className="nav-label">{label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}

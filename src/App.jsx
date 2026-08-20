import React, { useEffect, useRef } from "react";
import profileImage from "./assets/profile.jpg";
import resumePdf from "./assets/Ajay Kumar Saini.pdf";
import ThreeScene from "./components/ThreeScene.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Certificates from "./components/Certificates.jsx";
import Extras from "./components/Extras.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import AskAjayAI from "./components/AskAjayAI.jsx";
import PortfolioPet from "./components/PortfolioPet.jsx";
import CosmicCursor from "./components/CosmicCursor.jsx";

const links = {
  profile: profileImage,
  portfolio: "https://ajaykumarsaini.me/",
  github: "https://github.com/MR-Ajay1804",
  linkedin: "https://www.linkedin.com/in/ajay1804/",
  instagram: "https://www.instagram.com/the.xajju/",
  email: "mailto:ajay.techjourney@gmail.com",
  phone: "tel:+917878286373",
  repos: {
    weedDetection: "https://github.com/MR-Ajay1804/Weed-Detection-.git",
    signLanguage: "https://github.com/MR-Ajay1804/Sign-language-Detection-.git",
    library: "https://github.com/MR-Ajay1804/library-management-system.git",
    taskManager: "https://github.com/MR-Ajay1804/task-manager.git",
    csvDashboard: "https://github.com/MR-Ajay1804/CSV-Dashboard.git"
  },
  demos: {
    weedDetection: "https://weed-detection-qgd6.onrender.com/",
    taskManager: "https://task-manager-psi-sooty.vercel.app/",
    csvDashboard: "https://csv-dashboard-tau.vercel.app/",
    portfolio: "https://ajaykumarsaini.me/",
    library: "https://library-management-system-rfeo.onrender.com/"
  },
  resume: resumePdf,
  pythonCert: "/certificate-python.pdf",
  javaCert: "/certificate-java.pdf",
  rscit: "/Rscit.jpg",
  supremeCert: "https://drive.google.com/file/d/1sh3PkHe7YjCYRpiRqIRrtNBbcPeGZ6IL/view",
  upflairsCert: "https://drive.google.com/file/d/1Z088A4nodBJHBzimwMQ1yFcq97UKCV_s/view",
  weedPaper: "https://jscer.org/wp-content/uploads/2026/04/5/Weed%20detection.pdf"
};

const icons = {
  code: <><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></>,
  monitor: <><path d="M3 4h18v14H3z" /><path d="M8 22h8" /><path d="M12 18v4" /></>,
  database: <><path d="M4 7a8 4 0 0 1 16 0v10a8 4 0 0 1-16 0Z" /><path d="M4 7a8 4 0 0 0 16 0" /><path d="M4 12a8 4 0 0 0 16 0" /></>,
  sparkle: <><path d="M12 3v18" /><path d="M3 12h18" /><path d="m5 5 14 14" /><path d="m19 5-14 14" /></>,
  layers: <><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>,
  check: <><path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 1 1-6.2-8.56" /></>,
  school: <><path d="m22 10-10-5-10 5 10 5 10-5Z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></>,
  book: <><path d="M4 19.5V6a2 2 0 0 1 2-2h14v16H6a2 2 0 0 1 0-4h14" /></>,
  briefcase: <><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><path d="M4 7h16a2 2 0 0 1 2 2v11H2V9a2 2 0 0 1 2-2Z" /></>,
  trophy: <><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v7a5 5 0 0 1-10 0Z" /><path d="M5 9H3a3 3 0 0 1-3-3V4h7" /><path d="M19 9h2a3 3 0 0 0 3-3V4h-7" /></>,
  award: <><path d="M12 15 8.5 20l-1-4.5L3 14l3.5-5L12 15Z" /><path d="m12 15 3.5 5 1-4.5L21 14l-3.5-5L12 15Z" /><circle cx="12" cy="8" r="5" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
  mail: <><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.91.35 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />,
  github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9.5C4 13 7 15 10 15a4.8 4.8 0 0 0-1 3.5v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><path d="M2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M7 15l3-3 3 2 5-7" /><path d="M7 19v-4" /><path d="M12 19v-7" /><path d="M17 19V7" /></>,
  tasks: <><path d="M9 6h11" /><path d="M9 12h11" /><path d="M9 18h11" /><path d="m3 6 1 1 2-2" /><path d="m3 12 1 1 2-2" /><path d="m3 18 1 1 2-2" /></>,
  library: <><path d="M4 19V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2Z" /><path d="M8 7h7" /><path d="M8 11h7" /><path d="M8 15h5" /></>,
  hand: <><path d="M8 13V5a2 2 0 0 1 4 0v7" /><path d="M12 12V4a2 2 0 0 1 4 0v9" /><path d="M16 13V7a2 2 0 0 1 4 0v7c0 4-3 7-7 7h-1a8 8 0 0 1-7.5-5.2L3 12a2 2 0 0 1 3.6-1.8L8 13Z" /></>,
  video: <><path d="m22 8-6 4 6 4V8Z" /><rect x="2" y="6" width="14" height="12" rx="2" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>
};

const Icon = ({ name }) => <svg viewBox="0 0 24 24">{icons[name]}</svg>;
const IconBox = ({ name, tone = "" }) => <span className={`icon ${tone}`}><Icon name={name} /></span>;
const Tags = ({ items }) => <div className="tags">{items.map((item) => <span className="tag" key={item}>{item}</span>)}</div>;
const ActionLink = ({ href, label, icon = "external" }) => (
  <a className="mini-action" href={href} target="_blank" rel="noopener noreferrer">
    <Icon name={icon} />
    {label}
  </a>
);
const SectionHead = ({ title, children }) => (
  <div className="section-head" data-reveal>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>
);

const helpers = { Icon, IconBox, Tags, ActionLink, SectionHead };

const data = {
  links,
  skills: [
    { 
      icon: "code", 
      tone: "mint", 
      title: "Full Stack Development", 
      text: "JavaScript (ES6+), React.js, responsive UI/UX, REST APIs, Firebase, MySQL, and deployment-ready web applications with clean user flows.", 
      tags: ["JavaScript", "React.js", "APIs", "Firebase"] 
    },
    { 
      icon: "sparkle", 
      tone: "violet", 
      title: "AI Tools, Antigravity & Stitch", 
      text: "Expertise in Google Antigravity, Stitch, OpenAI Codex, Claude Code, ChatGPT, Gemini, and advanced Prompt Engineering for rapid agentic architecture, automated refactoring, and AI-driven full-stack development.", 
      tags: ["Antigravity", "Prompt Engineering", "Stitch", "Claude Code", "Codex"] 
    },
    { 
      icon: "hand", 
      tone: "blue", 
      title: "AI / ML & Computer Vision", 
      text: "Practical AI & ML project experience with weed detection, sign language recognition, Python, OpenCV, convolutional image processing, and model training.", 
      tags: ["Python", "OpenCV", "ML", "Computer Vision"] 
    },
    {
      icon: "external",
      tone: "gold",
      title: "Digital Marketing & SEO",
      text: "Working knowledge of SEO and digital marketing, including keyword research, on-page SEO, technical SEO, content optimization, and improving website search visibility.",
      tags: ["SEO", "Keyword Research", "Technical SEO"]
    },
    { 
      icon: "database", 
      tone: "blue", 
      title: "Backend & Data Architecture", 
      text: "API integration, backend connectivity, Firebase, MySQL, database flow, authentication concepts, and dynamic web features.", 
      tags: ["Node.js", "Firebase", "MySQL", "Auth"] 
    },
    { 
      icon: "external", 
      tone: "gold", 
      title: "Deployment & Cloud Platforms", 
      text: "Comfortable deploying and maintaining projects across Vercel, Render, Netlify, GitHub, and production-ready web hosting workflows.", 
      tags: ["Vercel", "Render", "Netlify", "GitHub"] 
    },
    { 
      icon: "layers", 
      tone: "mint", 
      title: "Computer Science Core", 
      text: "C++, DSA, OOP, DBMS, Computer Networks, Microprocessors, programming fundamentals, and structured problem solving.", 
      tags: ["C++", "DSA", "OOP", "DBMS"] 
    },
    { 
      icon: "check", 
      tone: "coral", 
      title: "Soft Skills & Content", 
      text: "Technical storytelling, peer support, resume building help, photography, video editing (VN, CapCut), and short-form creative storytelling (20K+ Views).", 
      tags: ["20K+ Views", "Editing", "Mentoring"] 
    }
  ],
  about: {
    intro: "I am Ajay Kumar Saini, a Full Stack Developer and Computer Science Engineering student from Alwar, Rajasthan. I build practical React and JavaScript web applications, agentic AI workflows with Antigravity, Codex, Stitch & Claude Code, and computer vision projects, and I use modern deployment and digital marketing practices to turn ideas into polished, useful digital products.",

    focus: [
      "Full Stack Development",
      "Antigravity & Agentic AI",
      "Prompt Engineering & Stitch",
      "Codex & Claude Code",
      "Computer Vision & ML"
    ],

    cards: [
      {
        icon: "monitor",
        tone: "mint",
        title: "Build",
        text: "I turn ideas into responsive web applications and useful product experiences using JavaScript, React.js, APIs, Firebase, and MySQL."
      },
      {
        icon: "sparkle",
        tone: "violet",
        title: "Agentic AI & Prompt Engineering",
        text: "I leverage Google Antigravity, Stitch, OpenAI Codex, Claude Code, Gemini, and advanced Prompt Engineering for rapid agentic architecture, automated refactoring, and AI-accelerated delivery."
      },
      {
        icon: "external",
        tone: "gold",
        title: "Deploy & Grow",
        text: "I deploy projects using Render, Vercel, and Netlify, and apply digital marketing and SEO fundamentals such as keyword research, on-page optimization, technical SEO, and content optimization."
      }
    ]
  },
  education: [
    { time: "2022 - 2026", icon: "school", tone: "blue", title: "B.Tech in Computer Science and Engineering", text: "Modern Institute of Technology and Research Centre (MITRC), Alwar, Rajasthan. Expected graduation: June 2026." },
    { time: "2022", icon: "book", tone: "mint", title: "12th - Science (PCM)", text: "Adinath Public School, Alwar, Rajasthan." },
    { time: "2020", icon: "book", tone: "gold", title: "10th", text: "Adinath Public School, Alwar, Rajasthan." }
  ],
  experiences: [
    { icon: "briefcase", tone: "coral", title: "Intern", text: "Supreme Cooling Systems, Khushkhera. Created and edited technical drawings using AutoCAD and supported digital documentation of industrial systems and processes.", tags: ["AutoCAD", "Documentation", "Apr-May 2025"], action: { label: "Internship Certificate", href: links.supremeCert } },
    { icon: "trophy", tone: "gold", title: "Full Stack Web Developer Intern", text: "Upflairs, Jaipur. Developed responsive web applications with HTML, CSS, JavaScript, and React; integrated APIs and backend connectivity; collaborated using Git and GitHub.", tags: ["Jul-Aug 2025", "React.js", "APIs"], action: { label: "Internship Certificate", href: links.upflairsCert } }
  ],
  certificates: [
    { icon: "award", tone: "blue", label: "View Resume", href: links.resume },
    { icon: "layers", tone: "mint", label: "Python Certificate", href: links.pythonCert },
    { icon: "shield", tone: "coral", label: "Java Certificate", href: links.javaCert },
    { icon: "check", tone: "gold", label: "RS-CIT", href: links.rscit },
    { icon: "briefcase", tone: "blue", label: "Supreme Cooling Systems Internship Certificate", href: links.supremeCert },
    { icon: "briefcase", tone: "mint", label: "Upflairs Full Stack Internship Certificate", href: links.upflairsCert },
    { icon: "book", tone: "coral", label: "Weed Detection Research Paper", href: links.weedPaper }
  ],
  projects: [
  {
    title: "Weed Detection AI",
    type: "AI / Machine Learning & Computer Vision Web App",
    text: "An AI-powered weed detection web application that uses plant image uploads and a trained image-processing pipeline to identify weeds and crops for practical precision-farming use cases.",
    role: "Built the web experience, connected the image prediction workflow, prepared the project presentation, and deployed the application on Render.",
    tags: ["Python", "Machine Learning", "Computer Vision", "Render"],
    visual: "sparkle",
    tone: "mint",
    highlights: [
      "Live Render deployment",
      "Image upload and prediction",
      "AI-powered plant classification",
      "Research-backed project"
    ],
    actions: [
      { label: "Live Demo", href: links.demos.weedDetection, icon: "external" },
      { label: "GitHub", href: links.repos.weedDetection, icon: "github" },
      { label: "Research Paper", href: links.weedPaper, icon: "book" }
    ]
  },

  {
    title: "Sign Language Detection",
    type: "Python & Computer Vision Project",
    text: "A Python and OpenCV computer vision project for recognizing hand gestures and signs through image processing and real-time detection concepts.",
    role: "Created the gesture-detection workflow and dataset processing pipeline while developing practical computer vision skills.",
    tags: ["Python", "OpenCV", "Computer Vision", "AI"],
    visual: "hand",
    tone: "blue",
    highlights: [
      "Gesture recognition",
      "Image processing",
      "Dataset processing",
      "Computer vision practice"
    ],
    actions: [
      { label: "GitHub", href: links.repos.signLanguage, icon: "github" }
    ]
  },

  {
    title: "Task Manager",
    type: "React Productivity Web Application",
    text: "A responsive task management web application for creating, tracking, and organizing daily tasks through a simple dashboard and practical task workflow.",
    role: "Built the responsive application flow, task creation experience, dashboard interface, and live deployment.",
    tags: ["JavaScript", "React.js", "Web App", "Vercel"],
    visual: "tasks",
    tone: "mint",
    highlights: [
      "Live Vercel deployment",
      "Task dashboard",
      "Task creation workflow",
      "Responsive interface"
    ],
    actions: [
      { label: "Live Demo", href: links.demos.taskManager, icon: "external" },
      { label: "GitHub", href: links.repos.taskManager, icon: "github" }
    ]
  },

  {
    title: "CSV Dashboard",
    type: "React Data Visualization Dashboard",
    visualizer: "data-waveform",
    text: "An interactive CSV data dashboard that converts tabular data into readable insights using charts, filters, summaries, and data exploration features.",
    role: "Designed the data exploration workflow, chart-based visualization experience, and deployed the dashboard for live use.",
    tags: ["JavaScript", "React.js", "Data Visualization", "Charts"],
    visual: "chart",
    tone: "blue",
    highlights: [
      "Interactive charts",
      "CSV data analysis",
      "Filters and summaries",
      "Live deployment"
    ],
    actions: [
      { label: "Live Demo", href: links.demos.csvDashboard, icon: "external" },
      { label: "GitHub", href: links.repos.csvDashboard, icon: "github" }
    ]
  },

  {
    title: "Library Management System",
    type: "Full Stack Web Application",
    visualizer: "codex-archive",
    text: "A full-stack library management web application for organizing books and library operations with structured records, data handling, and an admin-style interface.",
    role: "Built the full-stack management workflow and deployed the application on Render.",
    tags: ["Node.js", "JavaScript", "MySQL", "Full Stack", "Render"],
    visual: "library",
    tone: "gold",
    highlights: [
      "Full-stack workflow",
      "Book management",
      "Structured data handling",
      "Live Render deployment"
    ],
    actions: [
      { label: "Live Demo", href: links.demos.library, icon: "external" },
      { label: "GitHub", href: links.repos.library, icon: "github" }
    ]
  },

  {
    title: "3D Portfolio Website",
    type: "React Personal Portfolio & Personal Brand",
    visualizer: "hyper-portal",
    text: "A modern React and Vite developer portfolio featuring animated visual design, responsive sections, project showcases, AI assistance, and SEO-focused personal branding.",
    role: "Designed and built the portfolio as a futuristic personal brand experience, including the Ask Ajay AI assistant and SEO setup.",
    tags: ["React.js", "Vite", "Netlify", "SEO", "AI"],
    visual: "layers",
    tone: "violet",
    actions: [
      { label: "Live Demo", href: links.demos.portfolio, icon: "external" }
    ]
  }
],
  extras: [
    { icon: "video", tone: "coral", title: "Content Creator", text: "Created gym and technology-related content with 20K+ views across social media platforms." },
    { icon: "edit", tone: "gold", title: "Editing & Media", text: "Passionate about photography and video editing using VN, CapCut, and Lightroom." },
    { icon: "users", tone: "mint", title: "Peer Support", text: "Assists peers with programming concepts, project development, and resume building." }
  ]
};

function usePortfolioEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.16 });

    const revealItems = document.querySelectorAll("[data-reveal]");
    revealItems.forEach((item) => observer.observe(item));

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    const smoothHandlers = Array.from(smoothLinks).map((link) => {
      const handleClick = (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      };
      link.addEventListener("click", handleClick);
      return () => link.removeEventListener("click", handleClick);
    });

    return () => {
      observer.disconnect();
      smoothHandlers.forEach((cleanup) => cleanup());
    };
  }, []);
}

export default function App() {
  usePortfolioEffects();

  return (
    <>
      <CosmicCursor />
      <ThreeScene />
      <Navbar helpers={helpers} />
      <main id="home" className="wrap">
        <Hero links={links} helpers={helpers} />
        <About about={data.about} helpers={helpers} />
        <Skills skills={data.skills} helpers={helpers} />
        <Education education={data.education} helpers={helpers} />
        <Experience experiences={data.experiences} helpers={helpers} />
        <Certificates certificates={data.certificates} helpers={helpers} />
        <Projects projects={data.projects} helpers={helpers} />
        <Extras extras={data.extras} helpers={helpers} />
        <Contact links={links} helpers={helpers} />
      </main>
      <PortfolioPet />
      <AskAjayAI helpers={helpers} />
      <Footer />
    </>
  );
}



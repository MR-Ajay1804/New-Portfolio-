import React, { useEffect, useRef } from "react";
import profileImage from "./assets/profile.jpg";
import resumePdf from "./assets/Ajay Kumar Saini.pdf";
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

const links = {
  profile: profileImage,
  portfolio: "https://ajay-protfolio.netlify.app/",
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
    portfolio: "https://ajay-protfolio.netlify.app/",
    library: "https://library-management-system-rfeo.onrender.com/"
  },
  resume: resumePdf,
  pythonCert: "https://ajay-protfolio.netlify.app/certificate-python.pdf",
  javaCert: "https://ajay-protfolio.netlify.app/certificate-java.pdf",
  rscit: "https://ajay-protfolio.netlify.app/Rscit.jpg",
  supremeCert: "http://drive.google.com/file/d/1sh3PkHe7YjCYRpiRqIRrtNBbcPeGZ6IL/view",
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
    { icon: "code", tone: "mint", title: "Full Stack Development", text: "JavaScript, React.js, responsive UI, APIs, Firebase, MySQL, and deployment-ready web applications with clean user flows.", tags: ["JavaScript", "React.js", "APIs"] },
    { icon: "sparkle", tone: "violet", title: "AI Tools & Prompt Engineering", text: "Efficient use of ChatGPT, Gemini, Claude AI, Claude Code, Codex, and Nano Banana for coding, debugging, research, content, and faster delivery.", tags: ["ChatGPT", "Gemini", "Claude"] },
    { icon: "hand", tone: "blue", title: "AI / ML Projects", text: "Practical AI project experience with weed detection, sign language detection, Python, OpenCV, image processing, and ML fundamentals.", tags: ["Python", "OpenCV", "ML"] },
    { icon: "database", tone: "blue", title: "Backend & Data", text: "API integration, backend connectivity, Firebase, MySQL, database flow, authentication concepts, and dynamic web features.", tags: ["Firebase", "MySQL", "Auth"] },
    { icon: "external", tone: "gold", title: "Deployment Platforms", text: "Comfortable deploying and maintaining projects across Vercel, Render, Netlify, GitHub, and production-ready web hosting workflows.", tags: ["Vercel", "Render", "Netlify"] },
    { icon: "layers", tone: "mint", title: "Computer Science", text: "C++, DSA, OOP, DBMS, Computer Networks, Microprocessors, programming fundamentals, and structured problem solving.", tags: ["C++", "DSA", "OOP"] },
    { icon: "check", tone: "coral", title: "Soft Skills", text: "Content creation, peer support, resume building help, photography, video editing, and short-form creative storytelling.", tags: ["20K+ Views", "Editing", "Mentoring"] }
  ],
  about: {
    intro: "I am a Full Stack Developer and CSE student who uses AI tools efficiently to move faster from idea to working product. I like building practical web apps, AI-assisted workflows, and computer vision projects that feel polished enough to share.",
    focus: ["Full Stack Developer", "AI-powered workflows", "React apps", "Computer Vision", "Fast deployment"],
    cards: [
      { icon: "monitor", tone: "mint", title: "Build", text: "I turn ideas into responsive interfaces, useful features, and clean project flows with JavaScript, React, APIs, and Firebase/MySQL basics." },
      { icon: "sparkle", tone: "violet", title: "Use AI Efficiently", text: "I use ChatGPT, Gemini, Claude, Claude Code, Codex, and Nano Banana to research, debug, design prompts, improve code, and speed up delivery." },
      { icon: "external", tone: "gold", title: "Deploy", text: "I can take projects live on Render, Vercel, and Netlify, then present them with demos, GitHub links, and clear documentation." }
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
      type: "Deployed AI / ML Web App",
      text: "A deployed precision-farming classifier that lets users upload plant images and predicts weed or crop output through a trained image-processing pipeline.",
      role: "Built the web experience, connected the prediction flow, prepared project presentation, and deployed it on Render.",
      tags: ["Python", "ML", "Render"],
      visual: "sparkle",
      tone: "mint",
      highlights: ["Live Render deployment", "Image upload workflow", "Research-backed AI project"],
      actions: [
        { label: "Live Demo", href: links.demos.weedDetection, icon: "external" },
        { label: "GitHub", href: links.repos.weedDetection, icon: "github" },
        { label: "Research Paper", href: links.weedPaper, icon: "book" }
      ]
    },
    {
      title: "Sign Language Detection",
      type: "Computer Vision Project",
      text: "A Python computer vision project focused on recognizing hand gestures and translating signs into readable output using real-time detection concepts.",
      role: "Created the detection workflow and dataset processing flow; deployment is planned next.",
      tags: ["Python", "OpenCV", "AI"],
      visual: "hand",
      tone: "blue",
      highlights: ["Gesture recognition", "Dataset processing", "Computer vision practice"],
      actions: [
        { label: "GitHub", href: links.repos.signLanguage, icon: "github" }
      ]
    },
    {
      title: "Task Manager",
      type: "Productivity Web App",
      text: "A clean task workflow app for creating, tracking, and organizing daily work with a simple dashboard and practical task forms.",
      role: "Built the responsive app flow, task creation experience, and live deployment.",
      tags: ["JavaScript", "React", "Vercel"],
      visual: "tasks",
      tone: "mint",
      highlights: ["Live Vercel app", "Task dashboard", "Daily productivity flow"],
      actions: [
        { label: "Live Demo", href: links.demos.taskManager, icon: "external" },
        { label: "GitHub", href: links.repos.taskManager, icon: "github" }
      ]
    },
    {
      title: "CSV Dashboard",
      type: "Data Visualization",
      text: "An interactive dashboard for turning CSV data into readable insights with charts, filters, and summary views. Useful for exploring tabular data quickly.",
      role: "Designed the data exploration flow and deployed the dashboard for live use.",
      tags: ["JavaScript", "Charts", "Dashboard"],
      visual: "chart",
      tone: "blue",
      actions: [
        { label: "Live Demo", href: links.demos.csvDashboard, icon: "external" },
        { label: "GitHub", href: links.repos.csvDashboard, icon: "github" }
      ]
    },
    {
      title: "Library Management System",
      type: "Full Stack Web App",
      text: "A deployed library system for managing books and library operations with a practical admin-style interface, structured records, and smooth data handling.",
      role: "Built a practical full-stack management workflow and deployed it on Render.",
      tags: ["Node.js", "JavaScript", "Render"],
      visual: "library",
      tone: "gold",
      actions: [
        { label: "Live Demo", href: links.demos.library, icon: "external" },
        { label: "GitHub", href: links.repos.library, icon: "github" }
      ]
    },
    {
      title: "3D Portfolio Website",
      type: "Personal Brand",
      text: "A modern React portfolio with animated visual depth, responsive sections, recruiter-ready project links, and a clean personal presentation for deployment.",
      role: "Designed and built the portfolio as a futuristic personal brand experience.",
      tags: ["React", "Vite", "Netlify"],
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

function Scene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    function sizeCanvas() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(86, Math.floor(window.innerWidth / 16)) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 1 + 0.2,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;
        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight + 20;
        if (p.y > window.innerHeight + 20) p.y = -20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 + p.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 238, 255, ${0.18 + p.z * 0.28})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 116) {
            ctx.strokeStyle = `rgba(98, 168, 255, ${0.16 * (1 - distance / 116)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    }

    sizeCanvas();
    draw();
    window.addEventListener("resize", sizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, []);

  return (
    <div className="scene" aria-hidden="true">
      <canvas id="stars" ref={canvasRef} />
      <div className="mesh" />
    </div>
  );
}

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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = prefersReducedMotion
      ? []
      : document.querySelectorAll(".panel, .project, .timeline-item, .cert, .contact-box, .contact-links a, .about-copy");
    const cleanups = Array.from(cards).map((card) => {
      const move = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
        card.style.transform = `translateY(-8px) rotateX(${y * -7}deg) rotateY(${x * 7}deg) scale(1.025)`;
      };
      const leave = () => {
        card.style.transform = "";
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      return () => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      observer.disconnect();
      smoothHandlers.forEach((cleanup) => cleanup());
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}

export default function App() {
  usePortfolioEffects();

  return (
    <>
      <Scene />
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
      <Footer />
    </>
  );
}

import React, { useEffect, useMemo, useRef, useState } from "react";

const starterQuestions = [
  { label: "🚀 Projects", query: "What projects has Ajay built?" },
  { label: "⚡ Tech Stack", query: "What is Ajay's core tech stack and skills?" },
  { label: "💼 Hire & Internships", query: "Is Ajay available for hire and internships?" },
  { label: "👁️ AI & Vision", query: "Tell me about his AI & Computer Vision work" },
  { label: "🎓 Education", query: "What is Ajay's educational background?" },
  { label: "📬 Contact", query: "How can I contact Ajay?" }
];

const localAnswers = [
  {
    keys: ["hire", "intern", "available", "job", "opportunity", "work", "relocate", "remote", "joining", "salary", "hiring"],
    answer:
      "Yes! Ajay is actively available for Full Stack Developer roles, Frontend/Backend Engineer positions, and AI/software development internships. He has strong hands-on experience building production React applications, integrating REST APIs, and working with modern AI workflows. He is ready for immediate onboarding (remote or on-site)!"
  },
  {
    keys: ["project", "built", "github", "demo", "repo", "portfolio", "task manager", "csv dashboard", "library", "weed", "sign language"],
    answer:
      "Ajay has built several production web apps and AI systems:\n• Weed Detection AI: Deep learning plant health & weed detection web app (with published research paper)\n• Sign Language Detection: Real-time hand gesture recognition using Python & OpenCV\n• Task Manager: Responsive task management app built with React\n• CSV Dashboard: Interactive data visualization & analytics tool\n• Library Management System: Full-stack CRUD management app\n• 3D Interactive Portfolio: Built with React, Vite, and Three.js WebGL\n\nAll projects include live demos and open-source code on GitHub!"
  },
  {
    keys: ["skill", "know", "tech", "stack", "language", "framework", "tool", "technologies"],
    answer:
      "Ajay's core engineering stack includes:\n• Languages: JavaScript (ES6+), Python, C++, HTML5, CSS3, SQL\n• Frontend: React.js, Three.js, Responsive Web Design, Glassmorphism, CSS Animations\n• Backend & DB: Node.js, Express, Firebase, MySQL, REST APIs\n• AI & Vision: OpenCV, Computer Vision, Machine Learning fundamentals\n• Tools & AI Workflows: Git, GitHub, Vercel, Render, Netlify, Claude Code, Gemini, ChatGPT, Codex."
  },
  {
    keys: ["vision", "weed", "sign", "paper", "research", "machine learning", "ml", "ai", "model", "deep learning"],
    answer:
      "Ajay specializes in AI and Computer Vision applications. He authored and published a research paper titled 'Weed Detection' in the JSCER Journal (2026), utilizing convolutional vision models to identify crop weeds. He also built real-time Sign Language Detection systems using OpenCV."
  },
  {
    keys: ["education", "college", "degree", "btech", "university", "mitrc", "school", "adinath"],
    answer:
      "Ajay is pursuing his Bachelor of Technology (B.Tech) in Computer Science and Engineering from Modern Institute of Technology and Research Centre (MITRC), Alwar, Rajasthan (graduating June 2026). He also completed 12th Science (PCM) from Adinath Public School, Alwar."
  },
  {
    keys: ["experience", "internship", "work experience", "company", "upflairs", "supreme"],
    answer:
      "Ajay's professional experience includes:\n• Full Stack Web Developer Intern at Upflairs (Jaipur): Built responsive web apps using React, JavaScript, REST APIs, and backend connectivity.\n• Intern at Supreme Cooling Systems (Khushkhera): Handled engineering drawings and digital documentation."
  },
  {
    keys: ["contact", "email", "phone", "instagram", "linkedin", "reach", "message", "social", "whatsapp"],
    answer:
      "You can reach Ajay Kumar Saini directly via:\n• Email: ajay.techjourney@gmail.com\n• Phone: +91 78782 86373\n• LinkedIn: https://www.linkedin.com/in/ajay1804/\n• GitHub: https://github.com/MR-Ajay1804\n• Instagram: https://www.instagram.com/the.xajju/"
  },
  {
    keys: ["about", "who", "ajay", "introduce", "summary", "tell me about"],
    answer:
      "Ajay Kumar Saini is a Full Stack Developer & AI Engineer based in Alwar, Rajasthan. He crafts high-performance web applications with React, computer vision models with OpenCV/Python, and intuitive 3D user experiences."
  },
  {
    keys: ["react", "what is react"],
    answer:
      "React is a popular open-source JavaScript library developed by Meta for building dynamic, component-based user interfaces. Ajay uses React along with modern state management, hooks, and responsive design patterns to build seamless web applications."
  },
  {
    keys: ["python", "what is python"],
    answer:
      "Python is a versatile, high-level programming language widely used in AI, machine learning, data science, and backend development. Ajay utilizes Python with OpenCV and ML libraries for computer vision and intelligent data processing."
  }
];

function getLocalAnswer(question) {
  const text = question.toLowerCase();

  const match = localAnswers.find((item) =>
    item.keys.some((key) => text.includes(key))
  );

  return (
    match?.answer ||
    "Ajay Kumar Saini is a Full Stack Developer & AI Engineer specializing in React, Three.js, practical AI workflows, and computer vision. Ask me anything about his projects, skills, research, education, availability for hire, or contact info!"
  );
}

export default function AskAjayAI({ helpers }) {
  const { Icon } = helpers;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi! I'm Ask Ajay AI. Ask me anything about Ajay's projects, skills, experience, education, hiring availability, or general tech questions!",
      animated: true
    }
  ]);

  const quickQuestions = useMemo(() => starterQuestions, []);

  const timerRef = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  /*
   * Allow other parts of the portfolio to open the AI.
   */
  useEffect(() => {
    const openChat = () => {
      setOpen(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    };

    window.addEventListener("open-ajay-ai", openChat);
    return () => {
      window.removeEventListener("open-ajay-ai", openChat);
    };
  }, []);

  /*
   * Keyboard shortcut: Esc to close
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  /*
   * Focus input when opened
   */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  /*
   * Automatically scroll to the latest message.
   */
  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, loading]);

  /*
   * Clean up typing animation on unmount.
   */
  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current);
    };
  }, []);

  /*
   * Animated assistant response.
   */
  function addAssistantAnswer(answer) {
    window.clearInterval(timerRef.current);

    const id = `ai-${Date.now()}`;
    let index = 0;

    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        text: "",
        id,
        typing: true,
        animated: true
      }
    ]);

    timerRef.current = window.setInterval(() => {
      index += Math.max(1, Math.floor(answer.length / 85));

      setMessages((current) =>
        current.map((message) =>
          message.id === id
            ? {
                ...message,
                text: answer.slice(0, index),
                typing: index < answer.length
              }
            : message
        )
      );

      if (index >= answer.length) {
        window.clearInterval(timerRef.current);
      }
    }, 18);
  }

  /*
   * Send question to backend or fallback.
   */
  async function ask(question) {
    const cleanQuestion = question.trim();

    if (!cleanQuestion || loading) return;

    setOpen(true);
    setInput("");
    setLoading(true);

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: cleanQuestion,
        animated: true
      }
    ]);

    const endpoints = [
      "/.netlify/functions/ask-ajay",
      "/api/ask-ajay",
      "https://ajaykumarsaini.me/api/ask-ajay"
    ];

    let answer = "";
    for (const ep of endpoints) {
      try {
        const response = await fetch(ep, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: cleanQuestion })
        });
        if (response.ok) {
          const data = await response.json();
          const candidate = typeof data.answer === "string" ? data.answer.trim() : "";
          // If the remote endpoint says it doesn't have that information, we fall back to our rich local answer
          if (
            candidate &&
            !candidate.toLowerCase().includes("don't have that information") &&
            !candidate.toLowerCase().includes("do not have that information")
          ) {
            answer = candidate;
            break;
          }
        }
      } catch {
        // Fallback
      }
    }

    if (!answer) {
      answer = getLocalAnswer(cleanQuestion);
    }

    addAssistantAnswer(answer);
    setLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    ask(input);
  }

  function handleClear() {
    window.clearInterval(timerRef.current);
    setMessages([
      {
        role: "assistant",
        text: "Chat cleared! How can I help you today?",
        animated: true
      }
    ]);
  }

  return (
    <aside
      className={`ai-assistant-wrap ${open ? "is-open" : ""}`}
      aria-label="Ask Ajay AI Assistant"
    >
      {open && (
        <div className="ai-chat-modal" role="dialog" aria-modal="true">
          {/* Chat Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-title-group">
              <span className="ai-online-indicator" />
              <div>
                <strong className="ai-chat-title">Ask Ajay AI</strong>
                <span className="ai-chat-subtitle">
                  {loading ? "Thinking..." : "AI Portfolio Assistant • Online"}
                </span>
              </div>
            </div>

            <div className="ai-chat-actions">
              <button
                type="button"
                onClick={handleClear}
                className="ai-clear-btn"
                title="Clear conversation"
                aria-label="Clear chat"
              >
                Clear
              </button>

              <button
                type="button"
                className="ai-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close Ask Ajay AI"
                title="Close [Esc]"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="ai-chat-messages"
            ref={messagesRef}
            aria-live="polite"
          >
            {messages.map((message, index) => {
              const isAi = message.role === "assistant";
              return (
                <div
                  key={message.id || `${message.role}-${index}`}
                  className={`ai-chat-bubble-wrap ${isAi ? "from-ai" : "from-user"} ${
                    message.animated ? "bubble-pop" : ""
                  }`}
                >
                  <div className="ai-chat-bubble">
                    {message.text.split("\n").map((line, lIdx) => (
                      <p key={lIdx} className="ai-text-line">
                        {line || "\u00A0"}
                      </p>
                    ))}
                    {message.typing && (
                      <span className="ai-typing-cursor" aria-hidden="true">
                        |
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="ai-chat-bubble-wrap from-ai bubble-pop">
                <div className="ai-chat-bubble ai-thinking-bubble">
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Prompt Suggestions */}
          <div className="ai-quick-suggestions">
            {quickQuestions.map((q) => (
              <button
                type="button"
                key={q.label}
                className="ai-suggestion-chip"
                onClick={() => ask(q.query)}
                disabled={loading}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form className="ai-chat-input-bar" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Ajay's work or skills..."
              maxLength={500}
              aria-label="Ask a question"
              disabled={loading}
              className="ai-chat-input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="ai-chat-send-btn"
              aria-label="Send message"
            >
              <Icon name="send" />
            </button>
          </form>
        </div>
      )}

      {/* Sleek Floating Toggle Button */}
      <button
        className={`ai-floating-toggle ${open ? "active" : ""}`}
        type="button"
        onClick={() => setOpen((val) => !val)}
        aria-label="Toggle Ask Ajay AI"
      >
        <span className="ai-toggle-glow-ring" aria-hidden="true" />
        <span className="ai-toggle-content">
          <span className="ai-toggle-dot" />
          <Icon name="sparkle" />
          <span className="ai-toggle-label">Ask Ajay AI</span>
        </span>
      </button>
    </aside>
  );
}
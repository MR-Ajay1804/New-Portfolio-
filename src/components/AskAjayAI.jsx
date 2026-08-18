import React, { useEffect, useMemo, useRef, useState } from "react";

const starterQuestions = [
  "Tell me about Ajay",
  "What projects has Ajay built?",
  "What is React?",
  "Explain machine learning"
];

const localAnswers = [
  {
    keys: ["project", "built", "github", "demo"],
    answer:
      "Ajay has built projects including Task Manager, CSV Dashboard, Library Management System, Sign Language Detection, Weed Detection AI, and this 3D portfolio. Several projects include live demos on Vercel, Render, and Netlify with GitHub repositories linked in the Projects section."
  },
  {
    keys: ["skill", "know", "tech", "stack"],
    answer:
      "Ajay works with JavaScript, React.js, HTML, CSS, Node.js basics, Firebase, MySQL, Python, OpenCV, C++, DSA, GitHub, Vercel, Render, and Netlify. He also uses AI tools like ChatGPT, Gemini, Claude, Claude Code, Codex, and Nano Banana for faster development workflows."
  },
  {
    keys: ["education", "college", "degree"],
    answer:
      "Ajay is pursuing B.Tech in Computer Science and Engineering from Modern Institute of Technology and Research Centre, Alwar, Rajasthan, with expected graduation in June 2026."
  },
  {
    keys: ["contact", "email", "phone", "instagram", "linkedin"],
    answer:
      "You can contact Ajay by email at ajay.techjourney@gmail.com, phone at +91 78782 86373, GitHub at github.com/MR-Ajay1804, LinkedIn at linkedin.com/in/ajay1804, or Instagram at instagram.com/the.xajju."
  },
  {
    keys: ["internship", "job", "hire", "available", "opportunity"],
    answer:
      "Ajay is open to Full Stack Developer, frontend, backend, internship, and AI-related software opportunities. He is based in Alwar, Rajasthan and has experience with React projects, API integration, deployments, and AI-assisted workflows."
  }
];

function getLocalAnswer(question) {
  const text = question.toLowerCase();

  const match = localAnswers.find((item) =>
    item.keys.some((key) => text.includes(key))
  );

  return (
    match?.answer ||
    "Sorry, I couldn't connect to the AI service right now. Please try again."
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
        "Hi! I'm Ask Ajay AI. Ask me anything, or ask about Ajay, his projects, skills, experience, or education.",
      animated: true
    }
  ]);

  const quickQuestions = useMemo(() => starterQuestions, []);

  const timerRef = useRef(null);
  const messagesRef = useRef(null);

  /*
   * Allow other parts of the portfolio to open the AI.
   */
  useEffect(() => {
    const openChat = () => setOpen(true);

    window.addEventListener("open-ajay-ai", openChat);

    return () => {
      window.removeEventListener("open-ajay-ai", openChat);
    };
  }, []);

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
   * Clean up typing animation.
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
      index += Math.max(1, Math.floor(answer.length / 95));

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
    }, 22);
  }

  /*
   * Send question to backend.
   *
   * IMPORTANT:
   * There is NO portfolio keyword filter here.
   *
   * Every question goes to Groq through /api/ask-ajay.
   */
  async function ask(question) {
    const cleanQuestion = question.trim();

    if (!cleanQuestion || loading) return;

    setOpen(true);
    setInput("");
    setLoading(true);

    /*
     * Add user's message immediately.
     */
    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: cleanQuestion,
        animated: true
      }
    ]);

    try {
      const response = await fetch("/.netlify/functions/ask-ajay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: cleanQuestion
        })
      });

      if (!response.ok) {
        throw new Error("AI service unavailable");
      }

      const data = await response.json();

      /*
       * Groq response.
       */
      const answer =
        typeof data.answer === "string" && data.answer.trim()
          ? data.answer.trim()
          : getLocalAnswer(cleanQuestion);

      addAssistantAnswer(answer);
    } catch (error) {
      console.error("Ask Ajay AI error:", error);

      /*
       * If Groq/backend fails, use local portfolio answers
       * as a fallback.
       */
      addAssistantAnswer(getLocalAnswer(cleanQuestion));
    } finally {
      setLoading(false);
    }
  }

  /*
   * Form submit.
   */
  function handleSubmit(event) {
    event.preventDefault();
    ask(input);
  }

  return (
    <aside
      className={`ai-assistant ${open ? "open" : ""}`}
      aria-label="Ask Ajay AI assistant"
    >
      {open && (
        <div className="ai-panel">
          {/* Header */}
          <div className="ai-head">
            <div>
              <strong>Ask Ajay AI</strong>

              <span>
                {loading
                  ? "Thinking..."
                  : "AI assistant • Ask anything"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Ask Ajay AI"
            >
              x
            </button>
          </div>

          {/* Messages */}
          <div
            className="ai-messages"
            ref={messagesRef}
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <p
                className={`ai-message ${message.role} ${
                  message.animated ? "message-pop" : ""
                } ${message.typing ? "is-typing" : ""}`}
                key={message.id || `${message.role}-${index}`}
              >
                {message.text}

                {message.typing && (
                  <span
                    className="typing-caret"
                    aria-hidden="true"
                  />
                )}
              </p>
            ))}

            {loading && (
              <p
                className="ai-message assistant thinking"
                aria-label="Ask Ajay AI is thinking"
              >
                <span />
                <span />
                <span />
              </p>
            )}
          </div>

          {/* Suggestions */}
          <div className="ai-suggestions">
            {quickQuestions.map((question) => (
              <button
                type="button"
                onClick={() => ask(question)}
                key={question}
                disabled={loading}
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            className="ai-form"
            onSubmit={handleSubmit}
          >
            <input
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask me anything..."
              maxLength={500}
              aria-label="Ask Ajay AI"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send question"
            >
              <Icon name="send" />
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        className="ai-toggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open Ask Ajay AI"
      >
        <Icon name="sparkle" />

        <span>Ask Ajay AI</span>
      </button>
    </aside>
  );
}
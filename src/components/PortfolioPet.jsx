import React, { useEffect, useMemo, useState } from "react";

const moods = [
  { x: 10, y: 70, label: "Need help?", mood: "curious" },
  { x: 80, y: 64, label: "Ask Ajay AI ✨", mood: "happy" },
  { x: 74, y: 20, label: "Projects? 🚀", mood: "excited" },
  { x: 14, y: 26, label: "Skills? 💻", mood: "thinking" },
  { x: 46, y: 76, label: "Contact me! 👋", mood: "wave" },
  { x: 82, y: 38, label: "Hire Ajay! 💼", mood: "happy" },
  { x: 18, y: 50, label: "Explore 3D 🌌", mood: "excited" }
];

export default function PortfolioPet() {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  const current = useMemo(() => moods[step % moods.length], [step]);

  // Periodic random wandering across screen (pauses when user hovers)
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!isHovered) {
        setStep((val) => (val + 1) % moods.length);
        setActive(true);

        const timeout = window.setTimeout(() => {
          setActive(false);
        }, 2600);
        return () => window.clearTimeout(timeout);
      }
    }, 7000);

    return () => window.clearInterval(timer);
  }, [isHovered]);

  function handleMouseEnter() {
    setIsHovered(true);
    setActive(true);
  }

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const maxMove = 5;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;

    setEyePosition({
      x: Math.max(-maxMove, Math.min(maxMove, (dx / distance) * maxMove)),
      y: Math.max(-maxMove, Math.min(maxMove, (dy / distance) * maxMove))
    });
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setActive(false);
    setEyePosition({ x: 0, y: 0 });
  }

  function openAssistant() {
    setActive(true);
    window.dispatchEvent(new Event("open-ajay-ai"));
    window.setTimeout(() => {
      setActive(false);
    }, 1800);
  }

  return (
    <button
      className={`portfolio-pet ${current.mood} ${active || isHovered ? "active" : ""} ${isHovered ? "heart-eyes" : ""}`}
      style={{
        "--pet-x": `${current.x}vw`,
        "--pet-y": `${current.y}vh`
      }}
      type="button"
      onClick={openAssistant}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Open Ask Ajay AI Assistant"
      title="Open Ask Ajay AI"
    >
      <span className="pet-bubble">
        {isHovered ? "I ❤️ Ajay's Work!" : current.label}
      </span>

      <span className="pet-shadow" />

      {isHovered && (
        <span className="pet-hearts" aria-hidden="true">
          <span className="pet-heart-float">❤️</span>
          <span className="pet-heart-float">✨</span>
          <span className="pet-heart-float">💖</span>
        </span>
      )}

      <span className="pet-body">
        <span className="pet-ear left" />
        <span className="pet-ear right" />

        <span className="pet-spark one" />
        <span className="pet-spark two" />

        <span className="pet-face">
          <span
            className={`pet-eye left ${isHovered ? "heart" : ""}`}
            style={{
              transform: isHovered ? "none" : `translate(${eyePosition.x}px, ${eyePosition.y}px)`
            }}
          />
          <span
            className={`pet-eye right ${isHovered ? "heart" : ""}`}
            style={{
              transform: isHovered ? "none" : `translate(${eyePosition.x}px, ${eyePosition.y}px)`
            }}
          />
          <span className="pet-mouth" />
        </span>

        <span className="pet-cheek left" />
        <span className="pet-cheek right" />

        <span className="pet-paw left" />
        <span className="pet-paw right" />

        <span className="pet-tail" />
      </span>
    </button>
  );
}
import React, { useEffect, useMemo, useState } from "react";

const moods = [
  { x: 9, y: 70, label: "Need help?", mood: "curious" },
  { x: 78, y: 66, label: "Ask Ajay AI", mood: "happy" },
  { x: 72, y: 24, label: "Projects?", mood: "excited" },
  { x: 12, y: 30, label: "Skills?", mood: "thinking" },
  { x: 44, y: 76, label: "Contact?", mood: "wave" }
];

export default function PortfolioPet() {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);

  // Mouse position relative to pet
  const [eyePosition, setEyePosition] = useState({
    x: 0,
    y: 0
  });

  const current = useMemo(() => moods[step], [step]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % moods.length);

      setActive(true);

      window.setTimeout(() => {
        setActive(false);
      }, 2200);
    }, 6200);

    return () => window.clearInterval(timer);
  }, []);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;

    // Limit eye movement
    const maxMove = 5;

    const distance = Math.sqrt(dx * dx + dy * dy) || 1;

    const moveX = Math.max(
      -maxMove,
      Math.min(maxMove, (dx / distance) * maxMove)
    );

    const moveY = Math.max(
      -maxMove,
      Math.min(maxMove, (dy / distance) * maxMove)
    );

    setEyePosition({
      x: moveX,
      y: moveY
    });
  }

  function handleMouseLeave() {
    setEyePosition({
      x: 0,
      y: 0
    });
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
      className={`portfolio-pet ${current.mood} ${
        active ? "active" : ""
      }`}
      style={{
        "--pet-x": `${current.x}vw`,
        "--pet-y": `${current.y}vh`
      }}
      type="button"
      onClick={openAssistant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Open Ask Ajay AI"
      title="Open Ask Ajay AI"
    >
      <span className="pet-bubble">
        {current.label}
      </span>

      <span className="pet-shadow" />

      <span className="pet-body">

        <span className="pet-ear left" />
        <span className="pet-ear right" />

        <span className="pet-spark one" />
        <span className="pet-spark two" />

        <span className="pet-face">

          <span
            className="pet-eye left"
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
            }}
          />

          <span
            className="pet-eye right"
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
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
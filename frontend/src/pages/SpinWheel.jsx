import { useState, useRef } from "react";

// Prizes shown on the wheel — edit freely to change odds/prizes.
// Weight = how many "slots" out of the total, controls probability.
const PRIZES = [
  { label: "Rs. 200 Cash", color: "#1F3327", weight: 3 },
  { label: "Free Small Oil", color: "#C98A3A", weight: 3 },
  { label: "Try Again", color: "#A6552E", weight: 4 },
  { label: "Free Shampoo", color: "#2E4A38", weight: 2 },
  { label: "Rs. 500 Cash", color: "#E0AC63", weight: 1 },
  { label: "iPhone (Grand Prize)", color: "#1B1B16", weight: 1 },
];

// Expand into individual equal-size wheel segments based on weight
const SEGMENTS = PRIZES.flatMap((p) => Array(p.weight).fill(p));
const SEGMENT_ANGLE = 360 / SEGMENTS.length;

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const winningIndex = Math.floor(Math.random() * SEGMENTS.length);

    // Continue spinning from current position
    const targetAngle =
      rotation +
      360 * 6 +
      (360 - (winningIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2));

    setRotation(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(SEGMENTS[winningIndex].label);
    }, 4200);
  };

  const gradient = SEGMENTS.map(
    (s, i) =>
      `${s.color} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`
  ).join(", ");

  return (
    <div
      className="container"
      style={{
        marginTop: 40,
        textAlign: "center",
        maxWidth: 520,
      }}
    >
      <p className="eyebrow">🎉 Unlimited Spins</p>

      <h1>Spin & Win 🎡</h1>

      <p style={{ color: "var(--muted)" }}>
        Try your luck for cash, free products, or the grand prize iPhone!
      </p>

      <div
        style={{
          position: "relative",
          width: 300,
          height: 300,
          margin: "30px auto",
        }}
      >
        {/* Pointer */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderTop: "22px solid var(--forest)",
            zIndex: 2,
          }}
        />

        {/* Wheel */}
        <div
          ref={wheelRef}
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `conic-gradient(${gradient})`,
            border: "6px solid var(--forest)",
            transition: spinning
              ? "transform 4.2s cubic-bezier(0.17, 0.67, 0.32, 1)"
              : "none",
            transform: `rotate(${rotation}deg)`,
            boxShadow: "0 10px 30px rgba(31,51,39,0.3)",
          }}
        />

        {/* Center Circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "var(--amber)",
            border: "4px solid var(--forest)",
            zIndex: 2,
          }}
        />
      </div>

      {/* Result */}
      {result && (
        <div className="card" style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "var(--clay)" }}>
            🎉 You won: {result}!
          </h2>

          <p style={{ color: "var(--muted)" }}>
            Contact us on WhatsApp to claim your prize.
          </p>
        </div>
      )}

      {/* Spin Button */}
      <button
        className="btn btn-amber"
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin the Wheel"}
      </button>
    </div>
  );
}
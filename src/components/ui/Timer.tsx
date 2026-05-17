import { useState, useEffect } from "react";
import { FONT, T } from "./tokens";

/**
 * Displays a circular countdown.
 * `endsAt`   — unix ms timestamp when the timer expires (from Firebase).
 * `totalMs`  — full duration used to size the arc (default 30 s).
 * `onExpire` — called once, client-side, when the clock hits 0.
 *              Only the host should pass a handler that writes to Firebase.
 */
export function Timer({
  endsAt,
  totalMs = 30_000,
  onExpire,
}: {
  endsAt: number;
  totalMs?: number;
  onExpire?: () => void;
}) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, endsAt - Date.now())
  );
  const [fired, setFired] = useState(false);

  useEffect(() => {
    // Recalculate when endsAt changes (new voting round)
    setRemaining(Math.max(0, endsAt - Date.now()));
    setFired(false);
  }, [endsAt]);

  useEffect(() => {
    const id = setInterval(() => {
      const left = Math.max(0, endsAt - Date.now());
      setRemaining(left);
      if (left === 0 && !fired) {
        setFired(true);
        onExpire?.();
      }
    }, 250);
    return () => clearInterval(id);
  }, [endsAt, fired, onExpire]);

  const seconds  = Math.ceil(remaining / 1000);
  const progress = Math.max(0, Math.min(1, remaining / totalMs));

  // SVG ring
  const size   = 52;
  const stroke = 3;
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const dash   = circ * progress;

  const urgent = seconds <= 5;
  const color  = urgent ? T.red : "#ffffff";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 14px",
      background: urgent ? T.redDim : "#0a0a0a",
      border: `1px solid ${urgent ? T.red + "55" : "#333333"}`,
      borderRadius: 10,
      transition: "background 0.3s, border-color 0.3s",
    }}>
      {/* Ring */}
      <svg width={size} height={size} style={{ flexShrink: 0, transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#1a1a1a" strokeWidth={stroke}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.25s linear, stroke 0.3s" }}
        />
        {/* Number in centre — undo the rotation so text is upright */}
        <text
          x="50%" y="50%"
          dominantBaseline="central" textAnchor="middle"
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "50% 50%",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: FONT,
            fill: color,
          }}
        >
          {seconds}
        </text>
      </svg>

      <div style={{ fontSize: 12, color: urgent ? T.red : T.textMuted, fontFamily: FONT, lineHeight: 1.4 }}>
        {seconds > 0
          ? <>Voting closes in <strong style={{ color }}>{seconds}s</strong></>
          : <strong style={{ color: T.red }}>Time's up — calculating…</strong>
        }
      </div>
    </div>
  );
}

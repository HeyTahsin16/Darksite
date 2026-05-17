import React from "react";
import { T, FONT } from "./ui/tokens";

interface Player {
  id: string;
  name: string;
  isHost?: boolean;
  isWinner?: boolean;
  isEliminated?: boolean;
}

export function PlayerRow({
  p,
  isCurrent,
  isMe,
}: {
  p: Player;
  isCurrent: boolean;
  isMe?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 22px",
        borderTop: `1px solid ${T.border}`,
        background: isCurrent ? "#0d0d0d" : "transparent",
        opacity: p.isEliminated ? 0.3 : 1,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          flexShrink: 0,
          background: p.isWinner ? "#222" : "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: FONT,
          color: p.isWinner ? "#e9d5ff" : T.textMuted,
          border: isCurrent
            ? "1px solid #ffffff"
            : `1px solid ${T.border}`,
        }}
      >
        {p.name[0].toUpperCase()}
      </div>

      {/* Name + labels */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: T.textPrimary,
            fontWeight: 500,
            fontFamily: FONT,
          }}
        >
          {p.name}
        </span>
        {isMe && (
          <span style={{ fontSize: 11, color: "#ffffff", fontFamily: FONT }}>
            you
          </span>
        )}
        {p.isHost && (
          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: FONT }}>
            host
          </span>
        )}
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: 6 }}>
        {isCurrent && !p.isWinner && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#ffffff",
              background: "#1a1a1a",
              borderRadius: 5,
              padding: "2px 8px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: FONT,
            }}
          >
            asking
          </span>
        )}
        {p.isWinner && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#ffffff",
              background: "#1a1a1a",
              borderRadius: 5,
              padding: "2px 8px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: FONT,
            }}
          >
            👑 winner
          </span>
        )}
        {p.isEliminated && !p.isWinner && (
          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: FONT }}>
            out
          </span>
        )}
      </div>
    </div>
  );
}

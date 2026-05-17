import React from "react";
import { FONT } from "./tokens";

export function VoteBtn({
  label,
  active,
  color,
  bgColor,
  onClick,
  disabled,
}: {
  label: string;
  active: boolean;
  color: string;
  bgColor: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-primary"
      style={{
        flex: 1,
        fontSize: "0.9rem",
        color: active ? color : "#fafafa",
        textTransform: "uppercase",
        padding: "10px 12px",
        borderRadius: 10,
        border: `2px solid ${active ? color : "#fafafa"}`,
        background: active ? bgColor : "#000000",
        boxShadow: active ? `3px 3px ${color}` : "3px 3px #fafafa",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled && !active ? 0.4 : 1,
        fontFamily: FONT,
        fontWeight: 600,
        letterSpacing: "0.06em",
      }}
    >
      {label}
    </button>
  );
}

import React from "react";
import { FONT } from "./tokens";

export function Btn({
  children,
  onClick,
  disabled,
  variant = "primary",
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-primary"
      style={{
        fontSize: "1rem",
        color: "#fafafa",
        textTransform: "uppercase",
        padding: "10px 20px",
        borderRadius: 10,
        border: "2px solid #fafafa",
        background: "#000000",
        boxShadow: "3px 3px #fafafa",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        fontFamily: FONT,
        fontWeight: 600,
        letterSpacing: "0.06em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

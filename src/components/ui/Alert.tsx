import React from "react";
import { FONT } from "./tokens";

const styles = {
  info:    { bg: "#0a0a18", border: "#2e2e6a", text: "#818cf8" },
  warn:    { bg: "#0f0a00", border: "#6a4500", text: "#fbbf24" },
  success: { bg: "#020f02", border: "#14532d", text: "#4ade80" },
} as const;

export function Alert({
  type,
  children,
}: {
  type: keyof typeof styles;
  children: React.ReactNode;
}) {
  const c = styles[type];
  return (
    <div
      style={{
        padding: "11px 14px",
        borderRadius: 8,
        fontSize: 13,
        lineHeight: 1.65,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        fontFamily: FONT,
      }}
    >
      {children}
    </div>
  );
}

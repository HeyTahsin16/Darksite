import React from "react";
import { T, FONT } from "./tokens";

/** All-caps section label. Used for in-game context labels only — not on the home screen. */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.15em",
        color: T.textSecond,
        textTransform: "uppercase",
        marginBottom: 12,
        fontFamily: FONT,
      }}
    >
      {children}
    </div>
  );
}

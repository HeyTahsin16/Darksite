import React from "react";
import { T } from "./tokens";

/** Outer card — single connected border, white glow, all rows share it. */
export function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="panel-glow"
      style={{
        width: "100%",
        maxWidth: 760,
        background: T.panel,
        border: "1px solid #333333",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

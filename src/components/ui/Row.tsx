import React from "react";
import { T } from "./tokens";

/** Section row inside a Panel. Pass `first` to suppress the top divider. */
export function Row({
  children,
  style,
  first,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  first?: boolean;
}) {
  return (
    <div
      style={{
        padding: "18px 22px",
        borderTop: first ? "none" : `1px solid ${T.border}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

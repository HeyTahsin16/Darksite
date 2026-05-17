import { useState, useEffect, useCallback } from "react";
import { FONT } from "./tokens";

export interface ToastMessage {
  id: number;
  text: string;
  type: "info" | "success" | "warn";
}

let _id = 0;
type Listener = (t: ToastMessage) => void;
const listeners: Listener[] = [];

/** Call this anywhere to fire a toast. */
export function showToast(text: string, type: ToastMessage["type"] = "info") {
  const msg: ToastMessage = { id: ++_id, text, type };
  listeners.forEach((fn) => fn(msg));
}

// Bell icon colours per type
const BELL_COLOR: Record<ToastMessage["type"], string> = {
  success: "rgb(0, 206, 62)",
  info:    "rgb(99, 179, 237)",
  warn:    "rgb(251, 191, 36)",
};

function BellIcon({ color }: { color: string }) {
  return (
    <svg className="bell" viewBox="0 0 24 24" width="13" height="13" fill="none">
      <path
        d="M12 2a7 7 0 0 0-7 7v4l-2 3h18l-2-3V9a7 7 0 0 0-7-7zm0 20a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z"
        style={{ fill: color }}
      />
    </svg>
  );
}

function Toast({ msg, onDone }: { msg: ToastMessage; onDone: (id: number) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10);
    const hide = setTimeout(() => setVisible(false), 2800);
    const rm   = setTimeout(() => onDone(msg.id), 3200);
    return () => { clearTimeout(show); clearTimeout(hide); clearTimeout(rm); };
  }, [msg.id, onDone]);

  const bellColor = BELL_COLOR[msg.type];

  return (
    <div
      style={{
        width: 240,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        padding: "0 14px",
        paddingRight: 36,      // room for the arrow slot (but no arrow rendered)
        backgroundColor: "rgb(44, 44, 44)",
        borderRadius: 10,
        color: "white",
        border: "none",
        position: "relative",
        fontFamily: FONT,
        fontSize: 13,
        lineHeight: 1.4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
        transform: visible ? "translateX(0)" : "translateX(130%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
        overflow: "hidden",
        whiteSpace: "nowrap" as const,
        textOverflow: "ellipsis",
      }}
    >
      <BellIcon color={bellColor} />
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
        {msg.text}
      </span>
    </div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const fn: Listener = (t) => setToasts((prev) => [...prev, t]);
    listeners.push(fn);
    return () => {
      const i = listeners.indexOf(fn);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  const remove = useCallback(
    (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id)),
    []
  );

  return (
    <div style={{
      position: "fixed", top: 20, right: 20,
      zIndex: 9999,
      display: "flex", flexDirection: "column", gap: 10,
      alignItems: "flex-end",
      pointerEvents: "none",
    }}>
      {toasts.map((t) => <Toast key={t.id} msg={t} onDone={remove} />)}
    </div>
  );
}

import { useState } from "react";
import { Notepad }            from "./ui/Notepad";
import { Chat, UnreadBadge }  from "./ui/Chat";
import { T }                  from "./ui/tokens";

// ── Notepad FAB — styled as the yellow notepad card ───────────────────────
function NotepadFAB({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title="My Notepad"
      style={{
        position: "relative",
        width: 56, height: 56,
        borderRadius: 14,
        border: "none",
        cursor: "pointer",
        padding: 0,
        overflow: "hidden",
        // notepad card gradient: yellow header strip + ruled lines
        background: `linear-gradient(
          to bottom,
          rgb(253,197,107) 12%, rgb(255,187,78) 24%,
          rgba(0,0,0,.3) 25%, rgba(0,0,0,.1) 26% 26%,
          #eee 28% 49%,
          rgba(0,0,0,.3) 50%,
          #eee 51% 74%,
          rgba(0,0,0,.3) 75%,
          #eee 76%
        )`,
        boxShadow: active
          ? "0 0 0 2px #fdc56b, 0 0 16px 3px rgba(253,197,107,0.5)"
          : "0 0 10px rgba(0,0,0,.5)",
        transform: active ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
    >
      {/* Dot-ruled lines overlay */}
      <span style={{
        position: "absolute",
        inset: "0 -3px",
        color: "rgba(0,0,0,.3)",
        fontSize: 41,
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}>
        ···
      </span>
    </button>
  );
}

// ── Chat FAB — simple dark square with speech bubble icon ─────────────────
function ChatFAB({ active, badge, onClick }: {
  active: boolean; badge: number; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title="Room Chat"
      style={{
        position: "relative",
        width: 56, height: 56,
        borderRadius: 14,
        border: `2px solid ${active ? "#fff" : "#333"}`,
        background: active ? "#222" : "#111",
        color: "#fff",
        fontSize: 24,
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: active ? "3px 3px #fff" : "2px 2px #333",
        transform: "none",
        transition: "box-shadow 0.15s, border-color 0.15s",
      }}
    >
      💬
      {badge > 0 && <UnreadBadge count={badge} />}
    </button>
  );
}

export function FloatingBar({
  gameCode,
  playerId,
  playerName,
}: {
  gameCode: string;
  playerId: string;
  playerName: string;
}) {
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [chatOpen,    setChatOpen]    = useState(false);
  const [unread,      setUnread]      = useState(0);

  function toggleNotepad() {
    setNotepadOpen((v) => !v);
    if (chatOpen) setChatOpen(false);
  }

  function toggleChat() {
    const opening = !chatOpen;
    setChatOpen(opening);
    if (opening) setUnread(0);
    if (notepadOpen) setNotepadOpen(false);
  }

  return (
    <>
      {/* Chat — bottom LEFT */}
      <div style={{ position: "fixed", bottom: 24, left: 24, zIndex: 300 }}>
        <ChatFAB active={chatOpen} badge={unread} onClick={toggleChat} />
      </div>

      {/* Notepad — bottom RIGHT */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 300 }}>
        <NotepadFAB active={notepadOpen} onClick={toggleNotepad} />
      </div>

      <Chat
        gameCode={gameCode}
        playerId={playerId}
        playerName={playerName}
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onUnread={(n) => { if (!chatOpen) setUnread((prev) => prev + n); }}
        side="left"
      />

      <Notepad
        storageKey={`${gameCode}:${playerId}`}
        open={notepadOpen}
        onClose={() => setNotepadOpen(false)}
        side="right"
      />
    </>
  );
}

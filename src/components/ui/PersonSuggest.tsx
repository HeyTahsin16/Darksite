import { useState, useRef, useEffect } from "react";
import { FONT, T } from "./tokens";

/**
 * A textarea with a floating suggestion list.
 * Only shows suggestions when the LAST word of the input looks like a name guess
 * (heuristic: text starts with "Am I" / "Are you" / "Is" or contains a capital letter mid-sentence).
 * The user clicks a suggestion to append/replace the person name in the text.
 */
export function PersonSuggest({
  value,
  onChange,
  placeholder,
  persons,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  persons: string[];
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen]               = useState(false);
  const containerRef                  = useRef<HTMLDivElement>(null);

  // Derive the search term: last "token" after the last space
  function getQuery(text: string): string {
    // grab everything after the last space (or whole text if no space)
    const parts = text.split(" ");
    return parts[parts.length - 1].trim();
  }

  useEffect(() => {
    const query = getQuery(value).toLowerCase();
    if (query.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const hits = persons
      .filter((p) => p.toLowerCase().includes(query))
      .slice(0, 6);
    setSuggestions(hits);
    setOpen(hits.length > 0);
  }, [value, persons]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function applySuggestion(person: string) {
    // Replace last token with the chosen name
    const parts = value.split(" ");
    parts[parts.length - 1] = person;
    onChange(parts.join(" "));
    setOpen(false);
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxSizing: "border-box" as const,
          minHeight: 78,
          background: T.inputBg,
          border: `1px solid ${T.inputBorder}`,
          borderRadius: 8,
          padding: "11px 14px",
          color: T.textPrimary,
          fontSize: 14,
          fontFamily: FONT,
          outline: "none",
          resize: "vertical" as const,
          lineHeight: 1.65,
          letterSpacing: "-0.01em",
        }}
      />

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          left: 0, right: 0,
          background: "#0d0d0d",
          border: `1px solid #333333`,
          borderRadius: 10,
          overflow: "hidden",
          zIndex: 50,
          boxShadow: "0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px #333",
        }}>
          {suggestions.map((person) => {
            const query = getQuery(value).toLowerCase();
            const idx   = person.toLowerCase().indexOf(query);
            const before = person.slice(0, idx);
            const match  = person.slice(idx, idx + query.length);
            const after  = person.slice(idx + query.length);
            return (
              <button
                key={person}
                onMouseDown={(e) => { e.preventDefault(); applySuggestion(person); }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left" as const,
                  padding: "10px 14px",
                  background: "transparent",
                  border: "none",
                  borderTop: `1px solid ${T.border}`,
                  color: T.textSecond,
                  fontSize: 13,
                  fontFamily: FONT,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {before}
                <span style={{ color: "#ffffff", fontWeight: 700 }}>{match}</span>
                {after}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

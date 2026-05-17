import React, { useId } from "react";

/**
 * Animated floating-label input.
 * `label` — the text shown as the animated label (defaults to placeholder).
 * Each character gets a staggered cubic-bezier lift on focus/filled.
 */
export function Input({
  value,
  onChange,
  placeholder,
  label,
  style,
  maxLength,
  inputStyle,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  label?: string;
  style?: React.CSSProperties;   // wrapper div style
  inputStyle?: React.CSSProperties;
  maxLength?: number;
}) {
  const id = useId();
  const displayLabel = label ?? placeholder ?? "";

  return (
    <div className="form-control" style={{ width: "100%", ...style }}>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        // "required" makes :valid fire when non-empty — keeps label up
        required={value.length > 0 || undefined}
        autoComplete="off"
        style={inputStyle}
      />
      <label htmlFor={id}>
        {displayLabel.split("").map((ch, i) => (
          <span key={i} style={{ transitionDelay: `${i * 40}ms` }}>
            {ch === " " ? "\u00a0" : ch}
          </span>
        ))}
      </label>
    </div>
  );
}

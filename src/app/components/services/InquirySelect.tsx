import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";

type Option = { value: string; label: string };

export function InquirySelect({
  id,
  value,
  placeholder,
  options,
  disabled = false,
  onChange,
}: {
  id: string;
  value: string;
  placeholder: string;
  options: Option[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open || !buttonRef.current) return;
    const place = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const menuHeight = Math.min(280, options.length * 46 + 12);
      const below = window.innerHeight - rect.bottom;
      const top = below < menuHeight && rect.top > menuHeight ? rect.top - menuHeight - 6 : rect.bottom + 6;
      setMenuStyle({ top, left: rect.left, width: rect.width });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, [open]);

  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const current = options.findIndex((option) => option.value === value);
      const start = current >= 0 ? current : 0;
      setOpen(true);
      setActive((index) => {
        const base = open ? index : start;
        return event.key === "ArrowDown" ? Math.min(options.length - 1, base + 1) : Math.max(0, base - 1);
      });
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(options[active]?.value ?? "");
      else setOpen(true);
    }
  };

  return (
    <div ref={rootRef} style={{ position: "relative", zIndex: open ? 40 : 1 }}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        className="field"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.75rem",
          textAlign: "left",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.55 : 1,
          color: selected ? "#f4f7fb" : "#9aa3b5",
        }}
      >
        <span>{selected?.label ?? placeholder}</span>
        <span aria-hidden="true" style={{ color: "#0080ff", fontSize: "0.8rem" }}>{open ? "–" : "+"}</span>
      </button>
      {open && createPortal(
        <ul
          ref={menuRef}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={id}
          style={{
            position: "fixed",
            left: menuStyle.left,
            top: menuStyle.top,
            width: menuStyle.width,
            zIndex: 80,
            margin: 0,
            padding: "0.3rem",
            listStyle: "none",
            background: "#0A0E1A",
            border: "1px solid rgba(255,255,255,0.18)",
            maxHeight: 280,
            overflowY: "auto",
            boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
          }}
        >
          {options.map((option, index) => {
            const highlighted = index === active || option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={option.value === value}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(option.value)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.7rem 0.75rem",
                    background: highlighted ? "#0080FF" : "transparent",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.98rem",
                    lineHeight: 1.35,
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>,
        document.body,
      )}
    </div>
  );
}

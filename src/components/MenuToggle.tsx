"use client";
import { useEffect, useRef, useState } from "react";
const links = [
  ["Services", "ilwyn"],
  ["Features", "ilwyn-2-2-3"],
  ["Portfolio", "ilwyn-2-2-4"],
  ["Pricing", "ilwyn-2-2-2-3"],
] as const;
export function MenuToggle() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const button = trigger.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previous;
      button?.focus();
    };
  }, [open]);
  return (
    <>
      <button
        ref={trigger}
        id="i1lwz-2-3-4"
        className="pwb-flex-grid-wrap"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <span id="ilouwl" />
        <span id="ilouwl-2" />
      </button>
      <dialog
        ref={dialog}
        id="mobile-menu"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="mobile-menu-heading">
          <span>Promptedsite Agency</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </dialog>
    </>
  );
}

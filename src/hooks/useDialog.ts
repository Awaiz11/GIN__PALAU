import { useEffect, useRef, type RefObject } from "react";

let dialogCount = 0;
let savedOverflow = "";
let savedPadding = "";

// Reference-count the lock so opening another dialog never unlocks the page.
function lockScroll() {
  if (dialogCount === 0) {
    savedOverflow = document.body.style.overflow;
    savedPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
  }
  dialogCount += 1;
  return () => {
    dialogCount = Math.max(0, dialogCount - 1);
    if (dialogCount === 0) {
      document.body.style.overflow = savedOverflow;
      document.body.style.paddingRight = savedPadding;
    }
  };
}

export default function useDialog(open: boolean, ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    const getFocusable = () =>
      Array.from(ref.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
      ) ?? []).filter((element) => element.getClientRects().length > 0);
    const frame = requestAnimationFrame(() => (getFocusable()[0] ?? ref.current)?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        ref.current?.focus();
        return;
      }
      if (event.shiftKey && (document.activeElement === first || !ref.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !ref.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      unlock();
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [open, ref]);
}
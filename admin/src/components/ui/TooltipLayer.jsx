import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/*
 * App-wide tooltips. Any element with `data-tooltip="Text"` gets a styled tooltip on hover
 * (after a short delay) and immediately on keyboard focus. Optional `data-tooltip-side`
 * ("top" | "bottom" | "left" | "right"). Positioned in a portal, so tooltips are never
 * clipped by scroll containers, and they flip/clamp to stay on screen.
 */

const GAP = 8;
const MARGIN = 8;
const HOVER_DELAY = 350;

function place(target, bubble, preferred) {
  const rect = target.getBoundingClientRect();
  const width = bubble.offsetWidth;
  const height = bubble.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fits = {
    top: rect.top - height - GAP >= MARGIN,
    bottom: rect.bottom + height + GAP <= vh - MARGIN,
    left: rect.left - width - GAP >= MARGIN,
    right: rect.right + width + GAP <= vw - MARGIN,
  };
  const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" };
  const side = fits[preferred] ? preferred : fits[opposite[preferred]] ? opposite[preferred] : "top";
  let left;
  let top;
  if (side === "top" || side === "bottom") {
    left = rect.left + rect.width / 2 - width / 2;
    top = side === "top" ? rect.top - height - GAP : rect.bottom + GAP;
  } else {
    top = rect.top + rect.height / 2 - height / 2;
    left = side === "left" ? rect.left - width - GAP : rect.right + GAP;
  }
  left = Math.min(Math.max(left, MARGIN), vw - width - MARGIN);
  top = Math.min(Math.max(top, MARGIN), vh - height - MARGIN);
  return { left, top, side };
}

export default function TooltipLayer() {
  const [tip, setTip] = useState(null); // { target, text, side }
  const [position, setPosition] = useState(null);
  const bubbleRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    const show = (target, immediate) => {
      clearTimeout(timer.current);
      const text = target.getAttribute("data-tooltip");
      if (!text) return;
      const open = () => setTip({ target, text, side: target.getAttribute("data-tooltip-side") || "top" });
      if (immediate) open();
      else timer.current = setTimeout(open, HOVER_DELAY);
    };
    const hide = () => {
      clearTimeout(timer.current);
      setTip(null);
      setPosition(null);
    };
    const onOver = (event) => {
      if (event.pointerType === "touch") return;
      const target = event.target.closest?.("[data-tooltip]");
      if (target) show(target, false);
    };
    const onOut = (event) => {
      const target = event.target.closest?.("[data-tooltip]");
      if (target && !target.contains(event.relatedTarget)) hide();
    };
    const onFocus = (event) => {
      const target = event.target.closest?.("[data-tooltip]");
      if (target && target.matches(":focus-visible")) show(target, true);
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", hide);
    document.addEventListener("pointerdown", hide, true);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      clearTimeout(timer.current);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", hide);
      document.removeEventListener("pointerdown", hide, true);
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, []);

  useEffect(() => {
    if (!tip || !bubbleRef.current) return;
    if (!tip.target.isConnected) {
      setTip(null);
      return;
    }
    setPosition(place(tip.target, bubbleRef.current, tip.side));
  }, [tip]);

  if (!tip) return null;
  return createPortal(
    <div
      ref={bubbleRef}
      role="tooltip"
      data-tooltip-bubble
      className="pointer-events-none fixed z-[250] max-w-[260px] rounded-lg bg-[#1d1736]/95 px-2.5 py-1.5 text-xs font-medium leading-snug text-white shadow-lg backdrop-blur transition-opacity duration-150"
      style={{
        left: position?.left ?? -9999,
        top: position?.top ?? -9999,
        opacity: position ? 1 : 0,
      }}
    >
      {tip.text}
    </div>,
    document.body,
  );
}

import React from "react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ACTIVE_CLASS = "opacity-1";
const INACTIVE_CLASS = "opacity-0";

const getOverlayPortal = () => {
  let overlayPortal = document.querySelector<HTMLDivElement>("#overlay-portal");
  if (overlayPortal) return overlayPortal;
  overlayPortal = document.createElement("div");
  overlayPortal.id = "overlay-portal";
  document.body.append(overlayPortal);
  return overlayPortal;
};
export interface OverlayProps {
  active?: boolean;
  background?: string;
  onClose: () => void;
}

export default function Overlay({
  active = false,
  background = "rgba(0,0,0,0.3)",
  onClose,
}: OverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const activateOverlay = useCallback(() => {
    if (!overlayRef.current) return;
    const overlay = overlayRef.current;

    setTimeout(() => {
      overlay.classList.remove(INACTIVE_CLASS);
      overlay.classList.add(ACTIVE_CLASS);
    }, 100);
  }, []);

  const inactivateOverlay = useCallback(() => {
    if (!overlayRef.current) return;
    const overlay = overlayRef.current;
    overlay.classList.remove(ACTIVE_CLASS);
    overlay.classList.add(INACTIVE_CLASS);
  }, []);

  useEffect(() => {
    if (active) {
      activateOverlay();
    } else {
      inactivateOverlay();
    }
  }, [active, activateOverlay, inactivateOverlay]);

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed left-0 right-0 top-0 bottom-0 transition-opacity duration-500 opacity-0"
      style={{ background }}
      onClick={onClose}
    />,
    getOverlayPortal(),
  );
}

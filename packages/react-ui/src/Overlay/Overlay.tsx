import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  activateTransitionClass?: string;
  inactivateTransitionClass?: string;
  transitionDuration?: string;
  background?: string;
  onClose: () => void;
}

export default function Overlay({
  active = false,
  activateTransitionClass = "opacity-1",
  inactivateTransitionClass = "opacity-0",
  transitionDuration = "duration-500",
  background = "rgba(0,0,0,0.3)",
  onClose,
}: OverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [_active, _setActive] = useState(active);

  const activateOverlay = useCallback(() => {
    if (!overlayRef.current) return;
    const overlay = overlayRef.current;
    _setActive(true);

    setTimeout(() => {
      overlay.classList.remove(inactivateTransitionClass);
      overlay.classList.add(activateTransitionClass);
    }, 100);
  }, [activateTransitionClass, inactivateTransitionClass]);

  const inactivateOverlay = useCallback(() => {
    if (!overlayRef.current) return;
    const overlay = overlayRef.current;
    overlay.classList.remove(activateTransitionClass);
    overlay.classList.add(inactivateTransitionClass);
  }, [activateTransitionClass, inactivateTransitionClass]);

  useEffect(() => {
    if (active) {
      activateOverlay();
    } else {
      inactivateOverlay();
    }
  }, [active, activateOverlay, inactivateOverlay]);

  if (!active && !_active) return <></>;

  return createPortal(
    <div
      ref={overlayRef}
      className={`fixed left-0 right-0 top-0 bottom-0 z-[2] transition-all ${transitionDuration} ${inactivateTransitionClass}`}
      style={{ background }}
      onTransitionEnd={() => {
        if (!active && _active) _setActive(false);
      }}
      onClick={onClose}
    />,
    getOverlayPortal(),
  );
}

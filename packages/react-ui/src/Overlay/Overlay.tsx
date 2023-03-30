import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import usePortal from "../hooks/usePortal";

export interface OverlayProps {
  active?: boolean;
  activateTransitionClasses?: string[];
  inactivateTransitionClasses?: string[];
  transitionDuration?: string;
  background?: string;
  portalIdentifier?: string;
  handleClick?: () => void;
}

export default function Overlay({
  active = false,
  activateTransitionClasses = ["opacity-1"],
  inactivateTransitionClasses = ["opacity-0"],
  transitionDuration = "duration-500",
  background = "rgba(0,0,0,0.3)",
  portalIdentifier = "overlay-portal",
  handleClick,
}: OverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayPortal = usePortal(portalIdentifier);
  const [_active, _setActive] = useState(active);

  const activateOverlay = useCallback(() => {
    if (!overlayRef.current) return;
    const overlay = overlayRef.current;
    _setActive(true);

    setTimeout(() => {
      overlay.classList.remove(...inactivateTransitionClasses);
      overlay.classList.add(...activateTransitionClasses);
    }, 100);
  }, [activateTransitionClasses, inactivateTransitionClasses]);

  const inactivateOverlay = useCallback(() => {
    if (!overlayRef.current) return;
    const overlay = overlayRef.current;
    overlay.classList.remove(...activateTransitionClasses);
    overlay.classList.add(...inactivateTransitionClasses);
  }, [activateTransitionClasses, inactivateTransitionClasses]);

  useEffect(() => {
    if (active) {
      activateOverlay();
    } else {
      inactivateOverlay();
    }
  }, [active, activateOverlay, inactivateOverlay]);

  if ((!active && !_active) || !overlayPortal) return <></>;

  return createPortal(
    <div
      ref={overlayRef}
      className={`fixed left-0 right-0 top-0 bottom-0 z-[2] transition-all ${transitionDuration} ${inactivateTransitionClasses.join(
        " ",
      )}`}
      style={{ background }}
      onTransitionEnd={() => {
        if (!active && _active) _setActive(false);
      }}
      onClick={handleClick}
    />,
    overlayPortal,
  );
}
